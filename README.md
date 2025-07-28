# Personal Branding Website with AI Chat

A modern, techno-minimalist personal branding website with an integrated AI chatbot powered by Claude.

## Features

- Modern techno-minimalist design
- Responsive layout
- Animated components using Framer Motion
- AI chatbot integration with Claude
- Clean, organized code structure
- Comprehensive About page with professional profile
- Multilingual support with i18next (English/Vietnamese)
- Blog system with MDX content
- Reading library with book reviews
- Finance tools and AI assistant
- Social impact tracking
- Newsletter subscription
- Firebase authentication (optional)
- Dark mode support
- CV/Resume download option

## Tech Stack

### Frontend
- **Next.js** 14.2.30
- **React** 18.3.1 
- **Framer Motion** 12.23.11 for animations
- **Tailwind CSS** 3.4.17 for styling
- **i18next** 24.2.3 for internationalization
- **MDX** for content management
- **Firebase** 11.10.0 for authentication
- **Axios** 1.11.0 for API calls

### Backend
- **FastAPI** 0.115.8
- **Python** 3.9+
- **Claude API** (Anthropic) 0.45.2
- **Uvicorn** 0.34.0 server
- **Pydantic Settings** 2.1.0

## Project Structure

```
ht-catalyst/
├── frontend/
│   ├── components/          # React components
│   ├── pages/              # Next.js pages
│   ├── content/            # MDX content (posts, books)
│   ├── public/             # Static assets
│   │   └── locales/        # Translation files
│   ├── styles/             # CSS and styling
│   ├── contexts/           # React contexts
│   ├── data/               # Static data files
│   ├── scripts/            # Build and utility scripts
│   └── docs/               # Documentation
└── backend/
    ├── app/                # FastAPI application
    │   ├── api/            # API endpoints
    │   ├── core/           # Core configuration
    │   ├── models/         # Data models
    │   ├── schemas/        # Pydantic schemas
    │   └── services/       # Business logic
    ├── tests/              # Test files
    └── requirements.txt    # Python dependencies
```

## Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.9+
- **Anthropic API Key**

### 1. Clone and Setup

```bash
git clone <repository-url>
cd ht-catalyst
```

### 2. Frontend Setup

```bash
cd frontend
npm install
```

### 3. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 4. Environment Configuration

Create a `.env` file in the `backend` directory:

```bash
cd backend
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```env
# Required: Your Anthropic API Key
ANTHROPIC_API_KEY=sk-ant-apiXX-your-key-here

# Optional: CORS origins (defaults to http://localhost:3000)
CORS_ORIGINS=http://localhost:3000

# Optional: Environment setting (development/production)
ENVIRONMENT=development
```

### 5. Run the Application

You have several options to run the application:

#### Option A: Run Both Services Simultaneously

```bash
cd frontend
npm run dev:all
```

#### Option B: Run Services Separately

**Terminal 1 - Backend:**
```bash
cd backend
source venv/bin/activate  # On macOS/Linux
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

#### Option C: Using Helper Scripts

**Backend only:**
```bash
cd backend
./start.sh          # On macOS/Linux
# or
start.bat           # On Windows
```

**From frontend directory:**
```bash
cd frontend
npm run backend     # Runs backend only
npm run dev:all     # Runs both frontend and backend
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Development

### Available Scripts (Frontend)

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint

# Content Management
npm run update-posts     # Update blog posts data

# Translation Management
npm run translate:extract    # Extract translation keys
npm run translate:generate   # Generate translation files
npm run translate:import     # Import translations from Excel
npm run translate:validate   # Validate translations
npm run translate           # Run all translation tasks

# Backend Control
npm run backend         # Start backend only
npm run backend:win     # Start backend on Windows
npm run dev:all         # Start both frontend and backend
```

### Content Management

#### Blog Posts
1. Create MDX files in `frontend/content/posts/`
2. Include proper frontmatter:
   ```yaml
   ---
   title: 'Your Post Title'
   subtitle: 'Optional subtitle'
   date: 'January 1, 2024'
   author:
     name: 'Your Name'
     avatar: '/images/avatar.jpg'
   category: 'Technology'
   tags: ['ai', 'development']
   coverImage: '/images/blog/your-image.jpg'
   excerpt: 'Brief description...'
   ---
   ```
3. Run `npm run update-posts` to update the posts data

#### Books/Library
Add book reviews as MDX files in `frontend/content/books/`

#### Translations
- English: `frontend/public/locales/en/common.json`
- Vietnamese: `frontend/public/locales/vi/common.json`

## Key Features

### 1. Multilingual Support
Complete i18next integration supporting English and Vietnamese with automatic language detection and switching.

### 2. AI Chat Integration
Powered by Claude API with customizable prompts and conversation context.

### 3. Content Management System
- Blog posts with MDX support
- Reading library with book reviews
- Automatic content processing
- Image optimization

### 4. Interactive Components
- Reading progress indicators
- Animated UI with Framer Motion
- Responsive design
- Dark mode support

### 5. Authentication (Optional)
Firebase integration for user authentication and protected routes.

## Production Deployment

### Build Frontend
```bash
cd frontend
npm run build
npm run start
```

### Configure Backend
1. Set `ENVIRONMENT=production` in `.env`
2. Configure CORS for your domain
3. Use a production ASGI server like Gunicorn

```bash
pip install gunicorn
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker
```

## Security Considerations

- ✅ API keys stored in environment variables
- ✅ `.env` files ignored in Git
- ✅ CORS protection enabled
- ✅ Input validation on all endpoints
- ✅ Secure error handling (no sensitive data exposure)
- ✅ Rate limiting support
- ✅ HTTPS redirect in production

## Troubleshooting

### Common Issues

1. **Backend won't start**: Check if Anthropic API key is properly set in `.env`
2. **Port conflicts**: Make sure ports 3000 and 8000 are available
3. **Dependencies issues**: Delete `node_modules` and `package-lock.json`, then run `npm install`
4. **Python environment**: Make sure virtual environment is activated before running backend

### Logs and Debugging

- Frontend logs: Check browser console
- Backend logs: Check terminal running uvicorn
- API documentation: Visit http://localhost:8000/docs

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details 