# FastAPI Backend Service

A modern FastAPI backend service with health check and file upload capabilities, using `uv` for dependency management.

## Features

- ✅ Health check endpoint (`GET /api/health`)
- 📁 File upload endpoint (`POST /api/upload`)
- 🚀 Fast development with automatic reload
- 📚 Interactive API documentation (Swagger UI)
- 🔧 Modern dependency management with `uv`
- 🌐 CORS configured for frontend integration

## Project Structure

```
backend/
├── app/
│   ├── __init__.py          # Makes app a Python package
│   ├── main.py              # FastAPI application entry point
│   └── routes/              # API route modules
│       ├── __init__.py      # Makes routes a Python package
│       ├── health.py        # Health check endpoint
│       └── upload.py        # File upload endpoint
├── pyproject.toml           # Project configuration and dependencies
└── README.md               # This file
```

## Prerequisites

- Python 3.12 or higher
- [uv](https://docs.astral.sh/uv/) - Ultra-fast Python package installer and resolver

### Installing uv

```bash
# macOS and Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# Windows
powershell -c "irm https://astral.sh/uv/install.ps1 | iex"

# Or via pip
pip install uv
```

## Quick Start

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   uv sync
   ```

3. **Run the development server:**
   ```bash
   uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

4. **Access the application:**
   - API: http://localhost:8000
   - Interactive API docs (Swagger UI): http://localhost:8000/docs
   - Alternative API docs (ReDoc): http://localhost:8000/redoc

## API Endpoints

### Health Check
- **GET** `/api/health`
- Returns the service health status
- Response: `{"status": "ok"}`

### File Upload
- **POST** `/api/upload`
- Accepts multiple files via `multipart/form-data`
- Form field name: `files` (supports multiple files)
- Returns information about uploaded files including filename, size, and content type

Example response:
```json
{
  "message": "Files uploaded successfully",
  "files_count": 2,
  "files": [
    {
      "filename": "example.jpg",
      "size": 123456,
      "content_type": "image/jpeg"
    },
    {
      "filename": "document.pdf",
      "size": 789012,
      "content_type": "application/pdf"
    }
  ]
}
```

## Development

### Available Scripts

- `uv run uvicorn app.main:app --reload --host 0.0.0.0 --port 8000` - Start development server with auto-reload
- `uv run uvicorn app.main:app --host 0.0.0.0 --port 8000` - Start production server
- `uv run pytest` - Run tests (after installing dev dependencies)

### Installing Development Dependencies

```bash
uv sync --dev
```

### Environment Variables

The application uses these default settings:
- Host: `0.0.0.0`
- Port: `8000`
- Debug: Enabled in development mode

### CORS Configuration

The application is configured to accept requests from:
- `http://localhost:3000` (React default)
- `http://localhost:5173` (Vite default)

## Testing the API

### Using curl

**Health Check:**
```bash
curl http://localhost:8000/api/health
```

**File Upload:**
```bash
curl -X POST "http://localhost:8000/api/upload" \
     -H "accept: application/json" \
     -H "Content-Type: multipart/form-data" \
     -F "files=@path/to/your/file.jpg" \
     -F "files=@path/to/another/file.png"
```

### Using the Interactive Documentation

1. Go to http://localhost:8000/docs
2. Click on the endpoint you want to test
3. Click "Try it out"
4. Fill in the required parameters
5. Click "Execute"

## Production Deployment

For production deployment, use:

```bash
uv run uvicorn app.main:app --host 0.0.0.0 --port 8080
```

Or with custom host/port:

```bash
uv run uvicorn app.main:app --host 0.0.0.0 --port 8080
```

## Troubleshooting

### Common Issues

1. **Import errors**: Make sure you're in the `backend` directory and have run `uv sync`
2. **Port already in use**: Change the port in the command or stop other services using port 8000
3. **CORS errors**: Check that your frontend URL is included in the CORS configuration in `app/main.py`

### Logs

The application logs will show:
- Server startup information
- Request/response details (in development mode)
- Any errors or exceptions

## Contributing

1. Install development dependencies: `uv sync --dev`
2. Make your changes
3. Run tests: `uv run pytest`
4. Ensure code quality and formatting standards are met

## License

This project is part of the bootcamp curriculum.