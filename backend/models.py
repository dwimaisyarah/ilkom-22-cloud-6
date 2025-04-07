from pydantic import BaseModel
from typing import Optional

class Task(BaseModel):
    id: int
    title: str
    done: bool = False
    pushover: Optional[bool] = False
    
class TaskUpdate(BaseModel):
    title: str | None = None
    done: bool | None = None