from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.v1.router import api_router
from app.core.config import settings

app = FastAPI(
    title="FIXIGO API",
    description="AI-powered local workforce intelligence and service coordination API.",
    version="0.1.0",
)

origins = settings.cors_allowed_origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health", tags=["health"])
def health_check():
    return {"status": "ok", "service": "fixigo-api", "environment": settings.app_env}

app.include_router(api_router, prefix=settings.api_v1_prefix)
