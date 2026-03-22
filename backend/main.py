from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, session
from app.config import settings

app = FastAPI(title="Smart Data Analyst", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(session.router, prefix="/api/sessions", tags=["sessions"])
app.include_router(chat.router, prefix="/api/chat", tags=["chat"])


@app.get("/health")
async def health_check():
    return {"status": "ok"}
