from datetime import datetime, timezone
from uuid import uuid4

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

router = APIRouter()

# Demo-only in-memory storage. This resets when the API process restarts.
_DEMO_REQUESTS: dict[str, dict] = {}

class ServiceRequestCreate(BaseModel):
    customer_id: str = Field(min_length=1)
    description: str = Field(min_length=10, max_length=3000)
    category_id: str | None = None
    address_id: str | None = None
    urgency: str = Field(default="normal", pattern="^(low|normal|high|emergency)$")

class ServiceRequestRead(ServiceRequestCreate):
    request_id: str
    status: str
    created_at: datetime

@router.post("/", response_model=ServiceRequestRead, status_code=201)
def create_service_request(payload: ServiceRequestCreate):
    request_id = str(uuid4())
    record = payload.model_dump()
    record.update({
        "request_id": request_id,
        "status": "submitted",
        "created_at": datetime.now(timezone.utc),
    })
    _DEMO_REQUESTS[request_id] = record
    return record

@router.get("/{request_id}", response_model=ServiceRequestRead)
def get_service_request(request_id: str):
    record = _DEMO_REQUESTS.get(request_id)
    if not record:
        raise HTTPException(status_code=404, detail="Service request not found")
    return record
