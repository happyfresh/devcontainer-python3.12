"""
File upload endpoint for handling multipart form data.
"""

from typing import List

from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()


@router.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    """
    Upload endpoint that accepts multiple files via multipart/form-data.

    Args:
        files: List of uploaded files

    Returns:
        dict: Information about uploaded files including filenames and sizes

    Raises:
        HTTPException: If no files are provided or other upload errors occur
    """
    if not files:
        raise HTTPException(status_code=400, detail="No files provided")

    uploaded_files = []

    for file in files:
        if not file.filename:
            continue

        # Read file content to get size
        content = await file.read()
        file_size = len(content)

        # Reset file position for potential future reads
        await file.seek(0)

        uploaded_files.append({
            "filename": file.filename,
            "size": file_size,
            "content_type": file.content_type
        })

    if not uploaded_files:
        raise HTTPException(status_code=400, detail="No valid files uploaded")

    return {
        "message": "Files uploaded successfully",
        "files_count": len(uploaded_files),
        "files": uploaded_files
    }
