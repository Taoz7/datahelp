from datetime import datetime
from typing import Optional
from fastapi import APIRouter, HTTPException
from app.models.schemas import SessionCreate, SessionResponse

router = APIRouter()

# Mock data
mock_sessions: list[dict] = []
_session_counter = 0


def _next_id() -> str:
    global _session_counter
    _session_counter += 1
    return f"session_{_session_counter}"


@router.get("", response_model=list[SessionResponse])
async def list_sessions():
    """获取所有会话列表"""
    return mock_sessions


@router.post("", response_model=SessionResponse, status_code=201)
async def create_session(data: SessionCreate):
    """创建新会话"""
    now = datetime.utcnow()
    session = {
        "id": _next_id(),
        "title": data.title,
        "created_at": now,
        "updated_at": now,
    }
    mock_sessions.insert(0, session)
    return session


@router.get("/{session_id}", response_model=SessionResponse)
async def get_session(session_id: str):
    """获取单个会话"""
    for s in mock_sessions:
        if s["id"] == session_id:
            return s
    raise HTTPException(status_code=404, detail="Session not found")


@router.delete("/{session_id}", status_code=204)
async def delete_session(session_id: str):
    """删除会话"""
    for i, s in enumerate(mock_sessions):
        if s["id"] == session_id:
            mock_sessions.pop(i)
            return
    raise HTTPException(status_code=404, detail="Session not found")
