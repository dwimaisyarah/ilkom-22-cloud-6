from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
from .models import Task, TaskUpdate
from . import crud, saas
import os

app = FastAPI()

# Middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve file statis dari folder frontend
app.mount("/static", StaticFiles(directory="frontend"), name="static")

# Serve index.html
@app.get("/")
def read_root():
    return FileResponse(os.path.join("frontend", "index.html"))

# Ambil semua task
@app.get("/tasks")
def read_tasks():
    return crud.get_all_tasks()

# Tambahkan task baru
@app.post("/tasks")
def create_task(task: Task):
    crud.add_task(task)
    if task.pushover:
        saas.send_notification(task.title)
    return {"message": "Task added"}

# Model untuk update task
class UpdateTask(BaseModel):
    title: Optional[str] = None
    done: Optional[bool] = None

#Perbarui task (bisa title, done, atau keduanya)
@app.put("/tasks/{task_id}")
def update_task(task_id: int, task_update: TaskUpdate):
    crud.update_task(task_id, task_update.title, task_update.done)
    return {"message": "Task updated"}


# @app.put("/tasks/{task_id}")
# def update_task(task_id: int, task: TaskUpdate):
#     for t in task:
#         if t["id"] == task_id:
#             if task.title is not None:
#                 t["title"] = task.title
#             if task.done is not None:
#                 t["done"] = task.done
#             return t
#     raise HTTPException(status_code=404, detail="Task not found")


# Hapus task
@app.delete("/tasks/{task_id}")
def delete_task(task_id: int):
    crud.delete_task(task_id)
    return {"message": "Task deleted"}
