from fastapi import APIRouter
from app.api.v1.endpoints import chat, newsletter

api_router = APIRouter()

# Include routers with explicit prefixes
api_router.include_router(
    newsletter.router,
    prefix="/newsletter",
    tags=["newsletter"],
)

api_router.include_router(
    chat.router,
    prefix="/chat",
    tags=["chat"],
)