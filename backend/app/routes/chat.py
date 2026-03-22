from datetime import datetime
from fastapi import APIRouter
from app.models.schemas import ChatRequest, ChatResponse, ChartData

router = APIRouter()

# Mock chat responses
MOCK_RESPONSES = {
    "default": "你好！我是智能数据分析助手。你可以用自然语言查询数据库中的数据，我会自动生成 SQL 并返回结果和可视化图表。\n\n例如你可以问我：\n- 查询所有部门的信息\n- 统计每个部门的员工数量\n- 查看薪资最高的前10名员工",
}


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """聊天端点（Mock 响应）"""
    now = datetime.utcnow()
    content = MOCK_RESPONSES["default"]
    return ChatResponse(
        id=f"msg_{now.timestamp()}",
        session_id=request.session_id,
        role="assistant",
        content=content,
        chart_data=ChartData(
            columns=["category", "value"],
            data=[
                {"category": "技术部", "value": 25},
                {"category": "产品部", "value": 18},
                {"category": "市场部", "value": 12},
                {"category": "运营部", "value": 20},
                {"category": "财务部", "value": 8},
            ],
            chart_type="bar",
        ),
        created_at=now,
    )
