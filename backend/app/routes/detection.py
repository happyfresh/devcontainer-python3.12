"""
Azure Computer Vision Object Detection endpoint.
"""

import logging
import os
from pathlib import Path
from typing import Any, Dict, List

import httpx
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

# Load environment variables from .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

router = APIRouter()

# Upload directory (same as upload.py)
UPLOAD_DIR = Path("uploads")


class BoundingBox(BaseModel):
    """Normalized bounding box with label and confidence score."""
    label: str
    x: float
    y: float
    w: float
    h: float
    score: float


class DetectionResponse(BaseModel):
    """Response model for object detection results."""
    boxes: List[BoundingBox]


async def call_azure_computer_vision(image_data: bytes) -> Dict[str, Any]:
    """
    Call Azure Computer Vision v3.2 Object Detection API.

    Args:
        image_data: Raw image bytes

    Returns:
        dict: Azure Computer Vision API response

    Raises:
        HTTPException: If API call fails
    """
    vision_endpoint = os.getenv("VISION_ENDPOINT")
    vision_key = os.getenv("VISION_KEY")

    if not vision_endpoint or not vision_key:
        logger.error("Azure Computer Vision credentials not configured")
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Azure Computer Vision service not configured. "
                   "Please set VISION_ENDPOINT and VISION_KEY env vars."
        )

    # Construct the API URL
    analyze_url = f"{vision_endpoint.rstrip('/')}/vision/v3.2/analyze"

    headers = {
        "Ocp-Apim-Subscription-Key": vision_key,
        "Content-Type": "application/octet-stream"
    }

    params = {
        "visualFeatures": "Objects"
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.post(
                analyze_url,
                headers=headers,
                params=params,
                content=image_data
            )

            if response.status_code == 200:
                return response.json()
            else:
                error_msg = f"Azure Computer Vision API error: " \
                    f"{response.status_code}"
                logger.error(f"{error_msg} - {response.text}")
                raise HTTPException(
                    status_code=status.HTTP_502_BAD_GATEWAY,
                    detail=error_msg
                )

    except httpx.TimeoutException:
        logger.error("Azure Computer Vision API timeout")
        raise HTTPException(
            status_code=status.HTTP_504_GATEWAY_TIMEOUT,
            detail="Azure Computer Vision API timeout"
        )
    except httpx.RequestError as e:
        logger.error(f"Azure Computer Vision API request error: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail="Failed to connect to Azure Computer Vision API"
        )


def normalize_detection_response(azure_response: Dict[str, Any]) -> \
        List[BoundingBox]:
    """
    Normalize Azure Computer Vision response to our standard format.

    Args:
        azure_response: Raw Azure Computer Vision API response

    Returns:
        List[BoundingBox]: Normalized bounding boxes
    """
    boxes = []

    if "objects" not in azure_response:
        logger.warning("No 'objects' field in Azure Computer Vision response")
        return boxes

    for obj in azure_response["objects"]:
        try:
            # Extract bounding box coordinates
            rect = obj.get("rectangle", {})
            x = rect.get("x", 0)
            y = rect.get("y", 0)
            width = rect.get("w", 0)
            height = rect.get("h", 0)

            # Extract label and confidence
            label = obj.get("object", "unknown")
            confidence = obj.get("confidence", 0.0)

            box = BoundingBox(
                label=label,
                x=float(x),
                y=float(y),
                w=float(width),
                h=float(height),
                score=float(confidence)
            )
            boxes.append(box)

        except (KeyError, ValueError, TypeError) as e:
            logger.warning(f"Failed to parse object detection result: {e}")
            continue

    return boxes


@router.get("/detections/{image_id}", response_model=DetectionResponse)
async def detect_objects(image_id: str):
    """
    Analyze an uploaded image for object detection using Azure Computer Vision.

    Args:
        image_id: The filename/ID of the uploaded image

    Returns:
        DetectionResponse: Normalized object detection results

    Raises:
        HTTPException: If image not found or detection fails
    """
    try:
        # Find the image file in the upload directory
        image_path = None
        for file_path in UPLOAD_DIR.iterdir():
            if file_path.is_file() and image_id in file_path.name:
                image_path = file_path
                break

        if not image_path or not image_path.exists():
            logger.error(f"Image not found: {image_id}")
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Image with ID '{image_id}' not found"
            )

        # Read the image file
        try:
            with open(image_path, "rb") as f:
                image_data = f.read()
        except IOError as e:
            logger.error(f"Failed to read image file {image_path}: {e}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to read image file"
            )

        # Call Azure Computer Vision API
        azure_response = await call_azure_computer_vision(image_data)

        # Normalize the response
        boxes = normalize_detection_response(azure_response)

        logger.info(f"Successfully detected {len(boxes)} objects in "
                    f"image {image_id}")
        return DetectionResponse(boxes=boxes)

    except HTTPException:
        # Re-raise HTTP exceptions as-is
        raise
    except Exception as e:
        logger.error(f"Unexpected error in object detection: {e}")
        # On any other failure, return empty boxes with error
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Object detection failed due to an unexpected error"
        )
