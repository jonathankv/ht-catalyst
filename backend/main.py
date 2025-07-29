from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
from config import Settings
import os
from dotenv import load_dotenv
from prompt_config import format_chat_prompt

# Load environment variables
load_dotenv()

# Load and validate settings
settings = Settings()
if not settings.validate_api_key():
    raise ValueError("Invalid API key format")

app = FastAPI(
    title="Human-Technology Catalyst API",
    debug=settings.DEBUG
)

# Get CORS origins from settings
origins = settings.CORS_ORIGINS.split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Anthropic client with validated API key
anthropic = Anthropic(
    api_key=settings.ANTHROPIC_API_KEY,
)

if settings.is_production:
    # Add production-specific middleware
    from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
    app.add_middleware(HTTPSRedirectMiddleware)

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Personal Branding API"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Create a chat message using the prompt configuration
        chat_params = format_chat_prompt(request.message)
        message = anthropic.messages.create(**chat_params)
        
        return {
            "response": message.content[0].text,
            "status": "success"
        }
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")  # Add logging for debugging
        raise HTTPException(status_code=500, detail="Internal server error")  # Don't expose raw error details

# For Vercel deployment - export the app
handler = app 