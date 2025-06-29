from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session
from typing import List
from jose import jwt, JWTError
from datetime import datetime, timedelta
import os

from backend import crud, saas, config
from backend.database import get_db
from backend.schemas import (
    Task, TaskCreate, TaskUpdate,
    UserCreate, User as UserSchema,
    TokenResponse
)

# JWT Settings
SECRET_KEY = config.SECRET_KEY
ALGORITHM = config.ALGORITHM
TOKEN_DURATION = config.ACCESS_TOKEN_EXPIRE_MINUTES

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

# Static file mounting
app.mount("/static", StaticFiles(directory="frontend"), name="static")
app.mount("/css", StaticFiles(directory="frontend/css"), name="css")
app.mount("/js", StaticFiles(directory="frontend/js"), name="js")

@app.get("/", include_in_schema=False)
def root():
    index_path = os.path.join("frontend", "index.html")
    return FileResponse(index_path)

@app.get("/test")
async def test():
    return {"status": "API running"}

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Helper: JWT token creation
def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=15))
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)) -> UserSchema:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = crud.get_user_by_username(db, username)
    if user is None:
        raise credentials_exception
    return user

# === Authentication Endpoints ===
@app.get("/me", response_model=UserSchema)
def read_users_me(current_user: UserSchema = Depends(get_current_user)):
    return current_user

@app.post("/register", response_model=UserSchema)
def register(user: UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user.username):
        raise HTTPException(status_code=400, detail="Username already exists")
    return crud.create_user(db, user)

@app.post("/token", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Incorrect username or password")
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=TOKEN_DURATION)
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id
    }

# === Task Endpoints ===
@app.get("/tasks", response_model=List[Task])
def list_tasks(db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    return crud.get_tasks_by_user(db, user_id=current_user.id)

@app.get("/tasks/{task_id}", response_model=Task)
def get_task(task_id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    task = crud.get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

@app.post("/tasks", response_model=Task, response_model_exclude_none=True)
async def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: UserSchema = Depends(get_current_user)
):
    try:
        result = crud.add_task(db, task, current_user.id)
        if result.pushover and current_user.pushover_user_key:
            try:
                saas.send_notification(result.judul, result.deskripsi, current_user.pushover_user_key)
            except Exception as e:
                print(f"Pushover notification failed: {e}")
            else:
                result = crud.update_task(db, result.id, TaskUpdate(notifikasi=True))
        return result
    except Exception as err:
        print(f"Error creating task: {err}")
        return JSONResponse(
            status_code=500,
            content={"detail": f"Failed to create task: {str(err)}"}
        )

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    updated = crud.update_task(db, task_id, task_update)
    if not updated:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    deleted = crud.delete_task(db, task_id)
    if not deleted:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted successfully"}

# === Serve HTML Files ===
@app.get("/{page_name}.html", include_in_schema=False)
def serve_html_file(page_name: str):
    html_path = os.path.join("frontend", f"{page_name}.html")
    if os.path.isfile(html_path):
        return FileResponse(html_path, media_type='text/html')
    raise HTTPException(status_code=404, detail="Page not found")
