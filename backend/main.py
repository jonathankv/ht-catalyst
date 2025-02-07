from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from anthropic import Anthropic
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize Anthropic client
anthropic = Anthropic(api_key=os.getenv('ANTHROPIC_API_KEY'))

class ChatRequest(BaseModel):
    message: str

@app.get("/")
async def read_root():
    return {"message": "Welcome to the Personal Branding API"}

@app.post("/api/chat")
async def chat(request: ChatRequest):
    try:
        # Create a chat message
        message = await anthropic.messages.create(
            model="claude-3-opus-20240229",
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": request.message
            }]
        )
        
        return {
            "response": message.content[0].text,
            "status": "success"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e)) 