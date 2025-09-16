from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import health, upload

app = FastAPI(
    title="FastAPI Backend Service",
    description="A FastAPI service with health check and file upload endpoints",
    version="0.1.0",
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:5173"
    ],  # React/Vite dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, tags=["health"])
app.include_router(upload.router, prefix="/api", tags=["upload"])


@app.get("/")
async def read_root():
    """Root endpoint returning basic service information."""
    return {
        "message": "FastAPI Backend Service",
        "version": "0.1.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }