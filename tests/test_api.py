from fastapi.testclient import TestClient
from backend.main import app
from backend.models import Task
import time

client = TestClient(app)

def test_create_and_get_task():
    task_id = int(time.time() * 1000)  # ID unik
    task = Task(id=task_id, title="Test Task", done=False, pushover=False)
    
    # Create task
    response = client.post("/tasks", json=task.dict())
    assert response.status_code == 200
    assert response.json()["message"] == "Task added"

    # Get task
    response = client.get("/tasks")
    assert response.status_code == 200
    data = response.json()
    assert any(t["id"] == task_id for t in data)

def test_update_task():
    task_id = int(time.time() * 1000)
    task = Task(id=task_id, title="Update Task", done=False, pushover=False)
    client.post("/tasks", json=task.dict())

    # Update task to done = true
    response = client.put(f"/tasks/{task_id}?done=true")
    assert response.status_code == 200
    assert response.json()["message"] == "Task updated"

def test_delete_task():
    task_id = int(time.time() * 1000)
    task = Task(id=task_id, title="Delete Task", done=False, pushover=False)
    client.post("/tasks", json=task.dict())

    # Delete task
    response = client.delete(f"/tasks/{task_id}")
    assert response.status_code == 200
    assert response.json()["message"] == "Task deleted"
