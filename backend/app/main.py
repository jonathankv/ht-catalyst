from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from app.core.config import settings
from app.api.v1.api import api_router
from app.database import Base, engine
import os

def create_application() -> FastAPI:
    """Create and configure the FastAPI application."""
    app = FastAPI(
        title=settings.PROJECT_NAME,
        openapi_url=f"{settings.API_V1_STR}/openapi.json",
        debug=settings.DEBUG
    )

    # Configure CORS using settings
    origins = [origin.strip() for origin in settings.CORS_ORIGINS.split(",") if origin.strip()]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    # Add compression for larger responses
    app.add_middleware(GZipMiddleware, minimum_size=1024)

    # Add production middleware
    if settings.is_production:
        from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
        app.add_middleware(HTTPSRedirectMiddleware)

    # In production, prefer migrations over create_all
    if not settings.is_production and os.getenv("ENABLE_CREATE_ALL", "true").lower() == "true":
        Base.metadata.create_all(bind=engine)

    # Include API router
    app.include_router(api_router, prefix=settings.API_V1_STR)

    @app.get("/")
    async def root():
        """Root endpoint for health checks."""
        return {
            "status": "healthy",
            "version": "1.0.0",
            "environment": settings.ENVIRONMENT
        }

    return app

app = create_application()