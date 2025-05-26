from fastapi.testclient import TestClient
from backend.main import app  # sesuaikan import app kamu

client = TestClient(app)

def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}