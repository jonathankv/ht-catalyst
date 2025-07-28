from anthropic import Anthropic
from app.core.config import settings
from app.schemas.chat import ChatRequest, ChatResponse
from typing import Dict, Any

class AIService:
    def __init__(self):
        self.client = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
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
        """Generate a response using the Anthropic API."""
        try:
            chat_params = self.format_chat_params(request)
            message = self.client.messages.create(**chat_params)
            
            return ChatResponse(
                response=message.content[0].text,
                status="success"
            )
        except Exception as e:
            return ChatResponse(
                response="",
                status="error",
                error=str(e)
            )

# Create global AI service instance
ai_service = AIService() 