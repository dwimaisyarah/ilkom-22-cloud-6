from .database import load_tasks, save_tasks
from .models import Task

def get_all_tasks():
    return load_tasks()

def add_task(task: Task):
    tasks = load_tasks()
    tasks.append(task.dict())
    save_tasks(tasks)

def update_task(task_id: int, title: str = None, done: bool = None):
    tasks = load_tasks()
    for task in tasks:
        if task['id'] == task_id:
            if title is not None:
                task['title'] = title
            if done is not None:
                task['done'] = done
            break
    save_tasks(tasks)


def delete_task(task_id: int):
    tasks = load_tasks()
    tasks = [task for task in tasks if task['id'] != task_id]
    save_tasks(tasks)
