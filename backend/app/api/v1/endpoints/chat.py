from fastapi import APIRouter, HTTPException, Depends, Request
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_service import ai_service
from app.utils.rate_limiter import rate_limit

router = APIRouter()

# Mounted at /api/v1/chat by the parent router, so keep local path root
@router.post("", response_model=ChatResponse)
async def chat(request_body: ChatRequest, request: Request, _: None = Depends(rate_limit)):
    """
    Chat endpoint that processes user messages and returns AI responses.
    """
    try:
        response = await ai_service.generate_response(request_body)
        if response.status == "error":
            raise HTTPException(status_code=500, detail=response.error)
        return response
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 