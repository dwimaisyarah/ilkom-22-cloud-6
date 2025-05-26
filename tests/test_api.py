from fastapi.testclient import TestClient
from backend.main import app 

client = TestClient(app)

def test_get_tasks():
    token = "azy34pcfkef4pr489wq5d4w7nyfe8z"  # Ganti dengan token yang valid untuk test
    headers = {"Authorization": f"Bearer {token}"}
    response = client.get("/all-tasks", headers=headers)
    assert response.status_code == 200
    assert isinstance(response.json(), list)
