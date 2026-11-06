from fastapi import APIRouter

router = APIRouter()

# Starter taxonomy only. Replace with database-backed category management.
CATEGORIES = [
    {"id": "electrical", "name": "Electrical"},
    {"id": "plumbing", "name": "Plumbing"},
    {"id": "appliance-repair", "name": "Appliance Repair"},
    {"id": "carpentry", "name": "Carpentry"},
    {"id": "cleaning", "name": "Cleaning"},
]

@router.get("/")
def list_categories():
    return {"items": CATEGORIES}
