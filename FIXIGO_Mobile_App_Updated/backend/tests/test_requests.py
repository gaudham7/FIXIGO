from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_create_and_get_request():
    payload = {
        "customer_id": "demo-customer",
        "description": "The kitchen tap is leaking continuously.",
        "category_id": "plumbing",
        "urgency": "normal"
    }
    created = client.post("/api/v1/requests/", json=payload)
    assert created.status_code == 201
    request_id = created.json()["request_id"]

    fetched = client.get(f"/api/v1/requests/{request_id}")
    assert fetched.status_code == 200
    assert fetched.json()["request_id"] == request_id
