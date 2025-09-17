"""
FastAPI application main module.
"""

from app.routes import detection, health, upload
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Bootcamp FastAPI Backend",
    description="A FastAPI service with health check, file upload, "
                "and object detection endpoints",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000",
                   "http://localhost:5173",
                   "http://localhost:5174"],  # React dev servers
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(health.router, prefix="/api", tags=["health"])
app.include_router(upload.router, prefix="/api", tags=["upload"])
app.include_router(detection.router, prefix="/api", tags=["detection"])


@app.get("/")
async def root():
    """Root endpoint returning basic information about the API."""
    return {
        "message": "Welcome to Bootcamp FastAPI Backend",
        "version": "0.1.0",
        "docs": "/docs",
        "redoc": "/redoc"
    }
