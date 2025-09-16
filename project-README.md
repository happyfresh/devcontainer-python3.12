# Monorepo Project

A full-stack application with FastAPI backend and React frontend.

## Project Structure

```
.
├── backend/                 # FastAPI backend service
│   ├── app/
│   │   ├── main.py         # FastAPI application
│   │   └── routes/         # API route modules
│   ├── pyproject.toml      # Python dependencies (uv)
│   └── README.md           # Backend documentation
├── frontend/               # React frontend application (placeholder)
│   └── README.md           # Frontend documentation
├── README.md               # This file
└── note-day1.md           # Lab notes
```

## Getting Started

### Backend (FastAPI)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies using uv:
   ```bash
   uv sync
   ```

3. Start the development server:
   ```bash
   uv run dev
   ```

The backend API will be available at http://localhost:8000

- API Documentation: http://localhost:8000/docs
- Alternative docs: http://localhost:8000/redoc

### Frontend (React) - Coming Soon

The frontend is currently a placeholder. It will be implemented as a React application using:
- Vite for build tooling
- Tailwind CSS for styling
- shadcn/ui for components
- React Router for navigation

## API Endpoints

### Health Check
- `GET /health` - Returns service health status

### File Upload
- `POST /api/upload` - Upload files (multipart/form-data)

## Technology Stack

### Backend
- **FastAPI**: Modern Python web framework
- **uv**: Fast Python package manager
- **Uvicorn**: ASGI server
- **python-multipart**: File upload support

### Frontend (Planned)
- **React**: UI framework
- **Vite**: Build tool
- **Tailwind CSS**: Utility-first CSS
- **shadcn/ui**: Component library
- **Axios**: HTTP client

## Development

This is a monorepo containing both backend and frontend applications. Each directory has its own README with specific instructions.

For the complete lab workflow, see `note-day1.md`.