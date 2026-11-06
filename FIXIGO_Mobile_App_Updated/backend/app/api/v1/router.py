from fastapi import APIRouter
from app.api.v1.endpoints import categories, requests

api_router = APIRouter()
api_router.include_router(categories.router, prefix="/categories", tags=["categories"])
api_router.include_router(requests.router, prefix="/requests", tags=["service requests"])
