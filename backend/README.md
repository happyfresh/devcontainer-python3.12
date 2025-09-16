# FastAPI Backend Service

A modern FastAPI backend service with health check and file upload functionality.

## Features

- **Health Check**: GET `/health` endpoint for service monitoring
- **File Upload**: POST `/api/upload` endpoint for multipart file uploads
- **CORS Support**: Configured for frontend integration
- **Auto Documentation**: Interactive API docs at `/docs` and `/redoc`

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   └── routes/
│       ├── __init__.py
│       ├── health.py        # Health check endpoint
│       └── upload.py        # File upload endpoint
├── pyproject.toml           # Project configuration
└── README.md               # This file
```

## Requirements

- Python 3.8+
- uv (for dependency management)

## Installation

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies using uv:
   ```bash
   uv sync
   ```

   This will create a virtual environment and install all dependencies specified in `pyproject.toml`.

## Development

### Running the Development Server

Start the development server with hot reload:

```bash
uv run dev
```

Or manually with uvicorn:

```bash
uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Running the Production Server

Start the production server:

```bash
uv run start
```

Or manually:

```bash
uv run uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## API Endpoints

### Health Check

- **URL**: `/health`
- **Method**: `GET`
- **Description**: Returns service health status
- **Response**:
  ```json
  {
    "status": "ok"
  }
  ```

### File Upload

- **URL**: `/api/upload`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Description**: Accepts one or more file uploads
- **Parameters**:
  - `files`: List of files to upload (form data)
- **Response**:
  ```json
  {
    "message": "Files uploaded successfully",
    "files": [
      {
        "filename": "example.jpg",
        "size": 1024,
        "content_type": "image/jpeg"
      }
    ],
    "total_files": 1
  }
  ```

### Root Endpoint

- **URL**: `/`
- **Method**: `GET`
- **Description**: Returns basic service information
- **Response**:
  ```json
  {
    "message": "FastAPI Backend Service",
    "version": "0.1.0",
    "docs": "/docs",
    "redoc": "/redoc"
  }
  ```

## API Documentation

Once the server is running, you can access the interactive API documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc
- **OpenAPI JSON**: http://localhost:8000/openapi.json

## Testing

Install development dependencies and run tests:

```bash
uv sync --dev
uv run pytest
```

## Environment Configuration

The application supports CORS for the following origins by default:
- `http://localhost:3000` (React development server)
- `http://localhost:5173` (Vite development server)

To modify CORS settings, edit the `CORSMiddleware` configuration in `app/main.py`.

## Dependencies

Main dependencies (see `pyproject.toml` for complete list):

- **FastAPI**: Modern, fast web framework for building APIs
- **Uvicorn**: ASGI server for running FastAPI applications  
- **python-multipart**: Required for handling file uploads

Development dependencies:
- **pytest**: Testing framework
- **httpx**: HTTP client for testing
- **pytest-asyncio**: Async support for pytest

## uv Configuration

This project uses `uv` as the dependency manager. The configuration in `pyproject.toml` includes:

- Project metadata and dependencies
- Development dependencies
- Custom scripts for running the application
- Build system configuration

### Available Scripts

- `uv run dev`: Start development server with hot reload
- `uv run start`: Start production server
- `uv run pytest`: Run tests