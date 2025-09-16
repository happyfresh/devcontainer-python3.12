from typing import List

from fastapi import APIRouter, File, HTTPException, UploadFile

router = APIRouter()


@router.post("/upload")
async def upload_file(files: List[UploadFile] = File(...)):
    """
    Upload one or more files and return their names and sizes.

    Args:
        files: List of uploaded files (multipart/form-data)

    Returns:
        Dict containing file information including names and sizes
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

        # Read the file content to get the size
        content = await file.read()
        file_size = len(content)

        uploaded_files.append({
            "filename": file.filename,
            "size": file_size,
            "content_type": file.content_type
        })

        # Reset file pointer for potential future use
        await file.seek(0)

    return {
        "message": "Files uploaded successfully",
        "files": uploaded_files,
        "total_files": len(uploaded_files)
    }
