from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


# ===== Session Models =====

class SessionCreate(BaseModel):
    title: str = Field(default="新会话", max_length=100)


class SessionResponse(BaseModel):
    id: str
    title: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# ===== Chat Models =====

class ChatRequest(BaseModel):
    session_id: str
    message: str


class ChartData(BaseModel):
    columns: list[str] = []
    data: list[dict] = []
    chart_type: str = "bar"


class MessageResponse(BaseModel):
    id: str
    session_id: str
    role: str
    content: str
    chart_data: Optional[ChartData] = None
    created_at: datetime


class ChatResponse(BaseModel):
    id: str
    session_id: str
    role: str = "assistant"
    content: str
    chart_data: Optional[ChartData] = None
    created_at: datetime
