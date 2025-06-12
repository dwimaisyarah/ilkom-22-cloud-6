#Import pustaka FastAPI dan komponen pendukung lainnya
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

# Import modul backend: operasi CRUD, konfigurasi, skema data, database
from backend import crud, saas, config
from backend.database import get_db
from backend.schemas import (
    Task, TaskCreate, TaskUpdate,
    UserCreate, User as UserSchema,
    TokenResponse
)

# ==== Konfigurasi JWT ====
SECRET_KEY = config.SECRET_KEY
ALGORITHM = config.ALGORITHM
ACCESS_TOKEN_EXPIRE_MINUTES = config.ACCESS_TOKEN_EXPIRE_MINUTES

# Skema otentikasi OAuth2 menggunakan password bearer
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Inisialisasi aplikasi FastAPI
app = FastAPI()

# Mount static files (akses via /static)
app.mount("/static", StaticFiles(directory="frontend"), name="static")
app.mount("/css", StaticFiles(directory="frontend/css"), name="css")
app.mount("/js", StaticFiles(directory="frontend/js"), name="js")


# Tampilkan index.html saat akses root "/"
@app.get("/", include_in_schema=False)
def serve_index():
    return FileResponse(os.path.join("frontend", "index.html"))

@app.get("/test")
async def root():
    return {"message": "API is running"}

# ==== Middleware CORS ====
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5500", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==== Utility Functions ====
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
        if not username:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = crud.get_user_by_username(db, username)
    if not user:
        raise credentials_exception
    return user

# ==== Auth Endpoints ====
@app.get("/me", response_model=UserSchema)
def read_users_me(current_user: UserSchema = Depends(get_current_user)):
    return current_user

@app.post("/register", response_model=UserSchema)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    if crud.get_user_by_username(db, user_data.username):
        raise HTTPException(status_code=400, detail="Username already registered")
    return crud.create_user(db, user_data)

@app.post("/token", response_model=TokenResponse)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = crud.authenticate_user(db, form_data.username, form_data.password)
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    access_token = create_access_token(
        data={"sub": user.username},
        expires_delta=timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    )
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user_id": user.id
    }

# ==== Task Endpoints ====
@app.get("/all-tasks", response_model=List[Task])
def read_tasks(db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    return crud.get_tasks_by_user(db, user_id=current_user.id)

@app.get("/ambil-tugas/{task_id}", response_model=Task)
def get_task(task_id: int, db: Session = Depends(get_db), user: UserSchema = Depends(get_current_user)):
    task = crud.get_task_by_id(db, task_id)
    if not task:
        raise HTTPException(status_code=404, detail="Tugas tidak ditemukan")
    return task

@app.post("/add-task", response_model=Task, response_model_exclude_none=True)
async def create_task(
    task: TaskCreate,
    db: Session = Depends(get_db),
    current_user: UserSchema = Depends(get_current_user)
):
    try:
        new_task = crud.add_task(db, task, current_user.id)

        if new_task.pushover and current_user.pushover_user_key:
            print("Kirim notif ke pushover...")
            try:
                saas.send_notification(new_task.judul, new_task.deskripsi, current_user.pushover_user_key)
            except Exception as notif_error:
                print(f"Gagal mengirim notifikasi Pushover: {notif_error}")
            else:
                updated_task = crud.update_task(db, new_task.id, TaskUpdate(notifikasi=True))
                return updated_task

        return new_task

    except Exception as e:
        print(f"Error create_task: {e}")
        return JSONResponse(
            status_code=500,
            content={"detail": f"Gagal menambahkan task: {str(e)}"}
        )

@app.put("/tasks/{task_id}", response_model=Task)
def update_task(task_id: int, task_update: TaskUpdate, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    updated_task = crud.update_task(db, task_id, task_update)
    if not updated_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db), current_user: UserSchema = Depends(get_current_user)):
    deleted_task = crud.delete_task(db, task_id)
    if not deleted_task:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"message": "Task deleted"}

# ==== Serve HTML Files (signup.html, login.html, etc.) ====

@app.get("/{page_name}.html", include_in_schema=False)
def serve_html_page(page_name: str):
    file_path = os.path.join("frontend", f"{page_name}.html")
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type='text/html')
    raise HTTPException(status_code=404, detail="Page not found")
