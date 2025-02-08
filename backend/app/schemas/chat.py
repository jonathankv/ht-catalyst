from pydantic import BaseModel, Field
from typing import List, Optional

class ChatMessage(BaseModel):
    role: str = Field(..., description="The role of the message sender (user or assistant)")
    content: str = Field(..., description="The content of the message")

class ChatRequest(BaseModel):
    message: str = Field(..., description="The user's message")
    context: Optional[List[ChatMessage]] = Field(default=None, description="Previous conversation context")

class ChatResponse(BaseModel):
    response: str = Field(..., description="The AI's response")
    status: str = Field(default="success", description="Status of the response")
    error: Optional[str] = Field(default=None, description="Error message if any") 