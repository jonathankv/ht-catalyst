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

# Create global AI service instance
ai_service = AIService() 