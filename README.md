# Personal Branding Website with AI Chat

A modern, techno-minimalist personal branding website with an integrated AI chatbot powered by Claude.

## Features

- Modern techno-minimalist design
- Responsive layout
- Animated components using Framer Motion
- AI chatbot integration with Claude
- Clean, organized code structure
- Comprehensive About page with professional profile
- Multilingual support with i18next
- Blog system with MDX content
- Dark mode support
- CV/Resume download option

## Tech Stack

### Frontend
- Next.js 14
- React 18
- Framer Motion for animations
- Tailwind CSS for styling
- i18next for internationalization
- MDX for content management

### Backend
- FastAPI
- Python 3.x
- Claude API (Anthropic)
- Uvicorn server

## Key Components

### About Page
The About page provides a professional summary with sections for background, expertise, approach, and vision. It includes a profile section with social links, a CV download option, and a skills overview categorized by area of expertise. See [About Page Documentation](frontend/docs/About.md) for details on customization.

### Blog System
The blog system supports MDX content with frontmatter for metadata. Posts are automatically processed and displayed with proper formatting and categorization. The system includes:

- Automatic excerpt generation
- Category filtering
- Reading time estimation
- Featured images
- Responsive layout

See [Blog Automation Documentation](frontend/docs/BlogAutomation.md) for details on how to add and manage blog posts.

### AI Chat
The integrated AI chatbot powered by Claude allows visitors to interact with your content in a conversational way.

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

## Content Management

### Blog Posts
Add new blog posts as MDX files in `frontend/content/posts/`. Run `npm run update-posts` to update the posts data file.

The blog automation script handles:
- Extracting metadata from frontmatter
- Generating excerpts
- Validating images
- Creating JSON data for the frontend

For detailed instructions, see the [Blog Automation Documentation](frontend/docs/BlogAutomation.md).

### About Page
Customize your professional profile by updating the translation files in `frontend/public/locales/`. Key sections include:

- Profile information (name, job title)
- Professional summary (background, expertise, approach, vision)
- Skills categories and lists
- Social media links

Replace the profile image at `frontend/public/images/avatar/profile-avatar.jpg` and the CV file at `frontend/public/files/jonathan-vu-cv.pdf`.

## Security

- API keys are stored in environment variables
- `.env` files are ignored in Git
- CORS protection enabled
- Secure error handling
- Input validation on all API endpoints

## License

MIT 