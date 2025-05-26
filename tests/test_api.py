from fastapi.testclient import TestClient
from backend.main import app 


client = TestClient(app)

def test_get_tasks():
    response = client.get("/all-tasks")
    assert response.status_code == 200
    assert isinstance(response.json(), list)