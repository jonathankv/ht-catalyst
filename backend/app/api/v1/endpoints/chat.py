from fastapi import APIRouter, HTTPException, Depends, Request
from fastapi.responses import StreamingResponse
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


@router.post("/stream")
async def chat_stream(request_body: ChatRequest, request: Request, _: None = Depends(rate_limit)):
    """
    Streaming chat endpoint. Emits a text/plain stream of partial tokens.
    """
    async def text_event_generator():
        async for chunk in ai_service.stream_response(request_body):
            # Normalize stream errors to an SSE-style line the client can detect
            if chunk.startswith("[STREAM_ERROR]:"):
                # End the stream with an error marker
                yield chunk
                return
            yield chunk

    return StreamingResponse(text_event_generator(), media_type="text/plain; charset=utf-8")