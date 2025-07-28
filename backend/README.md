# Backend API Server

FastAPI backend for the Personal Branding Website with AI Chat integration powered by Claude.

## Overview

This backend provides:
- RESTful API endpoints for the frontend
- AI chat integration using Anthropic's Claude API
- Newsletter subscription management
- CORS support for cross-origin requests
- Environment-based configuration
- Comprehensive error handling and validation

## Tech Stack

- **FastAPI** 0.115.8 - Modern web framework
- **Uvicorn** 0.34.0 - ASGI server
- **Anthropic** 0.45.2 - Claude AI integration
- **Pydantic Settings** 2.1.0 - Configuration management
- **Python-dotenv** 1.0.1 - Environment variable loading

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── endpoints/
│   │       ├── chat.py          # AI chat endpoints
│   │       └── newsletter.py    # Newsletter endpoints
│   ├── core/
│   │   └── config.py           # Application configuration
│   ├── models/
│   │   └── subscriber.py       # Data models
│   ├── schemas/
│   │   └── chat.py            # Request/response schemas
│   ├── services/
│   │   └── ai_service.py      # AI integration logic
│   └── main.py                # FastAPI app initialization
├── tests/                     # Test files
├── requirements.txt          # Python dependencies
├── main.py                  # Application entry point
├── config.py               # Legacy config (use app/core/config.py)
├── prompt_config.py        # AI prompt configuration
├── start.sh               # Unix startup script
├── start.bat              # Windows startup script
└── .env.example          # Environment variables template
```

## Setup Instructions

### Prerequisites

- **Python 3.9+** (recommended 3.9-3.11)
- **pip** package manager
- **Anthropic API Key** (get from https://console.anthropic.com/)

### 1. Environment Setup

```bash
# Clone the repository (if not already done)
cd ht-catalyst/backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

**Required packages:**
- `fastapi==0.115.8` - Web framework
- `uvicorn==0.34.0` - ASGI server
- `python-dotenv==1.0.1` - Environment variables
- `anthropic==0.45.2` - Claude AI client
- `pydantic-settings==2.1.0` - Settings management

### 3. Environment Configuration

Create your environment file:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
# Required: Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-apiXX-your-actual-key-here

# Optional: Environment setting
ENVIRONMENT=development

# Optional: CORS origins (comma-separated for multiple)
CORS_ORIGINS=http://localhost:3000

# Optional: AI Configuration
AI_MODEL=claude-3-opus-20240229
MAX_TOKENS=1024
TEMPERATURE=0.7

# Optional: Server Configuration
PORT=8000
HOST=0.0.0.0
DEBUG=false
```

### 4. Verify Setup

Test your configuration:

```bash
python -c "
from app.core.config import Settings
from dotenv import load_dotenv
load_dotenv()
settings = Settings()
print('✅ Configuration loaded successfully')
print(f'Environment: {settings.ENVIRONMENT}')
print(f'API Key valid: {settings.validate_api_key()}')
"
```

## Running the Server

### Option 1: Using Start Scripts (Recommended)

**On macOS/Linux:**
```bash
chmod +x start.sh
./start.sh
```

**On Windows:**
```bash
start.bat
```

### Option 2: Direct Uvicorn Command

```bash
# Make sure virtual environment is activated
source venv/bin/activate  # On macOS/Linux
# or
venv\Scripts\activate     # On Windows

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Option 3: Python Module

```bash
python main.py
```

### Option 4: From Frontend Directory

```bash
cd ../frontend

# Backend only
npm run backend

# Both frontend and backend
npm run dev:all
```

## Development

### Environment Modes

- **Development** (`.env.development`): Debug mode, hot reload
- **Production** (`.env.production`): Optimized for deployment
- **Testing** (`.env.testing`): For running tests

### API Endpoints

The server provides the following endpoints:

- `GET /` - Health check
- `POST /api/chat` - AI chat interaction
- `POST /api/newsletter/subscribe` - Newsletter subscription
- `GET /docs` - Swagger UI documentation
- `GET /redoc` - ReDoc documentation

### Testing the API

Once running, you can test the endpoints:

```bash
# Health check
curl http://localhost:8000/

# Chat endpoint (requires valid API key)
curl -X POST "http://localhost:8000/api/chat" \
     -H "Content-Type: application/json" \
     -d '{"message": "Hello, how are you?"}'
```

### API Documentation

When the server is running, access interactive documentation:

- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Configuration Options

### Core Settings (app/core/config.py)

```python
class Settings(BaseSettings):
    # Environment
    ENVIRONMENT: Environment = Environment.DEVELOPMENT
    
    # API Keys
    ANTHROPIC_API_KEY: str  # Required
    BACKUP_API_KEY: Optional[str] = None
    
    # Server
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DEBUG: bool = False
    
    # CORS
    CORS_ORIGINS: str = "http://localhost:3000"
    
    # AI Configuration
    AI_MODEL: str = "claude-3-opus-20240229"
    MAX_TOKENS: int = 1024
    TEMPERATURE: float = 0.7
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Caching
    ENABLE_CACHE: bool = False
    CACHE_TTL: int = 3600
```

### AI Prompt Configuration

Customize AI behavior in `prompt_config.py`:

```python
def format_chat_prompt(user_message: str) -> dict:
    """Format chat prompt for Claude API"""
    # Custom prompt formatting logic
```

## Production Deployment

### 1. Environment Setup

```bash
# Set production environment
echo "ENVIRONMENT=production" >> .env

# Update CORS for your domain
echo "CORS_ORIGINS=https://yourdomain.com" >> .env
```

### 2. Production Server

Install and use Gunicorn for production:

```bash
pip install gunicorn

# Run with multiple workers
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### 3. Docker Deployment (Optional)

```dockerfile
FROM python:3.9-slim

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .
EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
```

## Troubleshooting

### Common Issues

1. **Import Errors**
   ```bash
   # Make sure you're in the backend directory
   cd backend
   source venv/bin/activate
   ```

2. **API Key Issues**
   ```bash
   # Check your .env file
   cat .env | grep ANTHROPIC_API_KEY
   
   # Verify key format (should start with sk-ant-)
   ```

3. **Port Already in Use**
   ```bash
   # Find process using port 8000
   lsof -i :8000
   
   # Kill the process or use different port
   uvicorn main:app --port 8001
   ```

4. **CORS Errors**
   ```bash
   # Update CORS_ORIGINS in .env
   CORS_ORIGINS=http://localhost:3000,http://127.0.0.1:3000
   ```

### Logs and Debugging

- Server logs appear in the terminal running uvicorn
- Set `DEBUG=true` in `.env` for verbose logging
- Check API documentation at http://localhost:8000/docs for endpoint testing

### Virtual Environment Issues

```bash
# Recreate virtual environment
rm -rf venv
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

## Development Guidelines

### Adding New Endpoints

1. Create endpoint in `app/api/endpoints/`
2. Add schemas in `app/schemas/`
3. Add business logic in `app/services/`
4. Register routes in `app/api/v1/api.py`

### Testing

```bash
# Run tests (when implemented)
pytest tests/

# Run specific test
pytest tests/test_chat.py
```

## Support

For issues and questions:

1. Check this README
2. Review API documentation at `/docs`
3. Check backend logs
4. Verify environment configuration

## License

MIT License - see LICENSE file for details 