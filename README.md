# Personal Branding Website with AI Chat

A modern, techno-minimalist personal branding website with an integrated AI chatbot powered by Claude.

## Features

- Modern techno-minimalist design
- Responsive layout
- Animated components using Framer Motion
- AI chatbot integration with Claude
- Clean, organized code structure

## Tech Stack

- Frontend: Next.js, React, Framer Motion
- Backend: FastAPI, Python
- AI: Claude API

## Setup

1. Install dependencies:
   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd backend
   python -m venv venv
   source venv/bin/activate
   pip install -r requirements.txt
   ```

2. Create a `.env` file in the backend directory:
   ```
   ANTHROPIC_API_KEY=your_api_key_here
   ```

3. Run the development servers:
   ```bash
   # Frontend (http://localhost:3000)
   cd frontend
   npm run dev

   # Backend (http://localhost:8000)
   cd backend
   uvicorn main:app --reload
   ```

## Security

- API keys are stored in environment variables
- `.env` files are ignored in Git
- CORS protection enabled
- Secure error handling

## License

MIT 