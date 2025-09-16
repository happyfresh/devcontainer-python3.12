import os
from pathlib import Path
from typing import List

from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()

# Create uploads directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


@router.post("/upload")
async def upload_file(files: List[UploadFile] = File(...)):
    """
    Upload one or more files and save them to the uploads directory.

    Args:
        files: List of uploaded files (multipart/form-data)

    Returns:
        Dict containing file information including names, sizes, and file paths
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")

    uploaded_files = []

    for file in files:
        if not file.filename:
            raise HTTPException(
                status_code=400,
                detail="File must have a filename"
            )

        # Read the file content
        content = await file.read()
        file_size = len(content)

        # Create file path
        file_path = UPLOAD_DIR / file.filename

        # Save file to uploads directory
        with open(file_path, "wb") as f:
            f.write(content)

        uploaded_files.append({
            "filename": file.filename,
            "size": file_size,
            "content_type": file.content_type,
            "file_path": str(file_path)
        })

        # Reset file pointer for potential future use
        await file.seek(0)

    return {
        "message": "Files uploaded successfully",
        "files": uploaded_files,
        "total_files": len(uploaded_files)
    }
