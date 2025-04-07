# backend/database.py
import json
from pathlib import Path

DATA_FILE = Path("backend/data/tasks.json")

if not DATA_FILE.exists():
    DATA_FILE.parent.mkdir(parents=True, exist_ok=True)
    DATA_FILE.write_text("[]")

def load_tasks():
    with open(DATA_FILE, 'r') as f:
        return json.load(f)

def save_tasks(tasks):
    with open(DATA_FILE, 'w') as f:
        json.dump(tasks, f, indent=2)
