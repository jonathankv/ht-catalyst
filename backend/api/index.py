from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Simple settings for Vercel
class Settings:
    ANTHROPIC_API_KEY = os.getenv('ANTHROPIC_API_KEY')
    CORS_ORIGINS = os.getenv('CORS_ORIGINS', 'http://localhost:3000,https://ht-catalyst-frontend.vercel.app')
    
    def validate_api_key(self) -> bool:
        return bool(self.ANTHROPIC_API_KEY and self.ANTHROPIC_API_KEY.startswith('sk-'))

settings = Settings()

# More robust error handling for deployment
if not settings.ANTHROPIC_API_KEY:
    print("WARNING: ANTHROPIC_API_KEY not set")
elif not settings.validate_api_key():
    print(f"WARNING: Invalid API key format: {settings.ANTHROPIC_API_KEY[:10]}...")
else:
    print("API key validated successfully")

app = FastAPI(
    title="Human-Technology Catalyst API",
    debug=False
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

# Initialize Anthropic client with error handling
try:
    if settings.ANTHROPIC_API_KEY:
        anthropic = Anthropic(api_key=settings.ANTHROPIC_API_KEY)
        print("Anthropic client initialized successfully")
    else:
        anthropic = None
        print("Anthropic client not initialized - missing API key")
except Exception as e:
    print(f"Error initializing Anthropic client: {e}")
    anthropic = None

# System prompt for the AI
SYSTEM_PROMPT = """You are a highly knowledgeable AI assistant focused on personal branding and career development. 
Follow these guidelines in all your responses:

1. Be concise and direct in your communication
2. Always provide actionable advice
3. Back up suggestions with real-world examples when possible
4. Focus on practical, implementable steps
5. Maintain a professional yet encouraging tone
6. When discussing personal branding, emphasize authenticity and unique value proposition
7. Structure longer responses with clear headings and bullet points
8. If asked about technical topics, provide code examples or specific tools when relevant

Remember to:
- Never provide harmful or unethical advice
- Admit when you don't have enough information
- Ask clarifying questions when needed
- Keep responses focused on personal branding and career development context
"""

def format_chat_prompt(user_message: str) -> dict:
    return {
        "model": "claude-3-opus-20240229",
        "max_tokens": 1024,
        "messages": [{
            "role": "user",
            "content": user_message
        }],
        "system": SYSTEM_PROMPT,
        "temperature": 0.7
    }

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Personal Branding API"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        if not anthropic:
            return {
                "response": "Sorry, the AI service is not available. Please check the API key configuration.",
                "status": "error"
            }
            
        chat_params = format_chat_prompt(request.message)
        message = anthropic.messages.create(**chat_params)
        
        return {
            "response": message.content[0].text,
            "status": "success"
        }
    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return {
            "response": f"Sorry, there was an error processing your request: {str(e)}",
            "status": "error"
        }

# For Vercel deployment
handler = app 