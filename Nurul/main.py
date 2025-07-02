# Middleware untuk log request sederhana
@app.middleware("http")
async def log_requests(request, call_next):
    print(f"Incoming request: {request.method} {request.url}")
    response = await call_next(request)
    print(f"Response status: {response.status_code}")
    return response

# Health check endpoint
@app.get("/health")
def health_check():
    return {"status": "ok", "timestamp": datetime.utcnow()}

# Tambahkan origin tambahan untuk CORS bila dibutuhkan
origins = [
    "http://localhost:5500",
    "http://127.0.0.1:5500"
]

# Update middleware CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route favicon handler (biar nggak error 404 di browser)
@app.get("/favicon.ico", include_in_schema=False)
def favicon():
    icon_path = os.path.join("frontend", "favicon.ico")
    if os.path.isfile(icon_path):
        return FileResponse(icon_path)
    raise HTTPException(status_code=404, detail="Favicon not found")

