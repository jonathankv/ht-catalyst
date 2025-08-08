from anthropic import AsyncAnthropic
from app.core.config import settings
from app.schemas.chat import ChatRequest, ChatResponse
from typing import Dict, Any
import asyncio

DEFAULT_REQUEST_TIMEOUT_SECONDS = 60
MAX_RETRY_ATTEMPTS = 2
INITIAL_BACKOFF_SECONDS = 0.5

class AIService:
    def __init__(self):
        # Use async client to avoid blocking the event loop
        self.client = AsyncAnthropic(api_key=settings.ANTHROPIC_API_KEY)
        self.model = settings.AI_MODEL
        self.max_tokens = settings.MAX_TOKENS
        self.temperature = settings.TEMPERATURE

    def format_chat_params(self, request: ChatRequest) -> Dict[str, Any]:
        """Format the chat parameters for the Anthropic API."""
        return {
            "model": self.model,
            "max_tokens": self.max_tokens,
            "temperature": self.temperature,
            "messages": [{"role": "user", "content": request.message}]
        }

    async def generate_response(self, request: ChatRequest) -> ChatResponse:
        """Generate a response using the Anthropic API with timeout and simple retries."""
        chat_params = self.format_chat_params(request)

        last_error: Exception | None = None
        backoff_seconds = INITIAL_BACKOFF_SECONDS

        for attempt in range(1, MAX_RETRY_ATTEMPTS + 2):
            try:
                message = await asyncio.wait_for(
                    self.client.messages.create(**chat_params),
                    timeout=DEFAULT_REQUEST_TIMEOUT_SECONDS,
                )

                return ChatResponse(
                    response=message.content[0].text,
                    status="success",
                )
            except Exception as error:  # broad catch to translate into consistent API errors
                last_error = error
                if attempt <= MAX_RETRY_ATTEMPTS:
                    await asyncio.sleep(backoff_seconds)
                    backoff_seconds *= 2
                else:
                    break

        return ChatResponse(
            response="",
            status="error",
            error=str(last_error) if last_error else "Unknown error",
        )

    async def stream_response(self, request: ChatRequest):
        """
        Async generator that yields plain text chunks of the assistant response using Anthropic streaming.
        Intended to be wrapped by a StreamingResponse/SSE endpoint.
        """
        chat_params = self.format_chat_params(request)

        # Attempt streaming with a timeout; surface partial chunks as they arrive
        try:
            # The AsyncAnthropic SDK supports streaming; depending on SDK version, either:
            # 1) client.messages.create(..., stream=True) returns an event stream
            # 2) client.messages.stream(...) is available as a context manager
            # We'll prefer the context manager API when present.
            stream_ctx = getattr(self.client.messages, "stream", None)
            if stream_ctx is not None:
                async with stream_ctx(**chat_params) as stream:
                    async for event in stream:
                        # Emit only textual deltas
                        if getattr(event, "type", "") == "content_block_delta":
                            delta = getattr(event, "delta", None)
                            text = getattr(delta, "text", None) if delta else None
                            if text:
                                yield text
                return
            else:
                # Fallback: create with stream=True and iterate .text_stream if available
                message = await self.client.messages.create(stream=True, **chat_params)
                text_stream = getattr(message, "text_stream", None)
                if text_stream is not None:
                    async for text in text_stream:
                        if text:
                            yield text
                    return
                # If no streaming API available, perform a single request and yield once
                message = await self.client.messages.create(**chat_params)
                yield message.content[0].text
        except Exception as error:
            # Surface error as a yielded exception text so the SSE endpoint can forward it as an error event
            yield f"[STREAM_ERROR]: {str(error)}"

# Create global AI service instance
ai_service = AIService() 