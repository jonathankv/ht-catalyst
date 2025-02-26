# Backend Server

This is the FastAPI backend for the Personal Branding Website with AI Chat.

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your Anthropic API key and other required variables

## Running the Server

### Using the Scripts

#### On macOS/Linux:
```bash
./start.sh
```

#### On Windows:
```bash
start.bat
```

### Manual Start
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## From Frontend Directory

You can also start the backend from the frontend directory using npm scripts:

```bash
# Start backend only
npm run backend

# On Windows
npm run backend:win

# Start both frontend and backend simultaneously
npm run dev:all
```

## API Documentation

When the server is running, you can access the API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc 