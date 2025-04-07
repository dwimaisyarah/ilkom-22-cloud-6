from fastapi.testclient import TestClient
from backend.main import app
from backend.models import Task

client = TestClient(app)

def test_create_and_get_task():
    task = Task(id=123, title="Test Task", done=False)
    response = client.post("/tasks", json=task.dict())
    assert response.status_code == 200
    response = client.get("/tasks")
    assert any(t["id"] == 123 for t in response.json())

def test_update_task():
    response = client.put("/tasks/123?done=true")
    assert response.status_code == 200

def test_delete_task():
    response = client.delete("/tasks/123")
    assert response.status_code == 200