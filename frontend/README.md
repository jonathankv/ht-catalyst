# Frontend - Personal Branding Website

Modern, responsive frontend built with Next.js, featuring AI chat integration, multilingual support, and elegant animations.

## Overview

A techno-minimalist personal branding website with:
- **Next.js 14** with React 18
- **Multilingual support** (English/Vietnamese)
- **AI chatbot** integration
- **Blog system** with MDX content
- **Reading library** for book reviews
- **Finance tools** and AI assistant
- **Social impact** tracking
- **Responsive design** with Framer Motion animations

## Tech Stack

### Core Framework
- **Next.js** 14.2.30 - React framework with SSR/SSG
- **React** 18.3.1 - UI library
- **Tailwind CSS** 3.4.17 - Utility-first CSS framework

### Animation & UI
- **Framer Motion** 12.23.11 - Animation library
- **React Icons** 5.5.0 - Icon library
- **@tailwindcss/typography** 0.5.16 - Typography utilities
- **@tailwindcss/forms** 0.5.10 - Form styling

### Internationalization
- **i18next** 24.2.3 - Internationalization framework
- **next-i18next** 15.4.2 - Next.js i18n integration
- **react-i18next** 15.6.1 - React i18n hooks

### Content Management
- **@mdx-js/react** 3.1.0 - MDX support for React
- **next-mdx-remote** 4.4.1 - MDX content loading
- **gray-matter** 4.0.3 - Frontmatter parsing

### Data & API
- **Axios** 1.11.0 - HTTP client
- **Firebase** 11.10.0 - Authentication and backend services
- **nanoid** 5.1.5 - Unique ID generation

### Development Tools
- **PostCSS** 8.5.6 - CSS processing
- **Autoprefixer** 10.4.21 - CSS vendor prefixes
- **Concurrently** 8.2.2 - Run multiple scripts
- **XLSX** 0.18.5 - Excel file processing

## Project Structure

```
frontend/
├── components/                 # React components
│   ├── About.js               # About page component
│   ├── blog/                  # Blog-related components
│   │   ├── BlogCard.js
│   │   ├── CategoryFilter.js
│   │   ├── FeaturedPost.js
│   │   └── TableOfContents.js
│   ├── ChatInterface.js       # AI chat interface
│   ├── finance/               # Finance tools components
│   ├── FloatingChat.js        # Floating chat widget
│   ├── impact/                # Social impact components
│   ├── library/               # Reading library components
│   ├── Layout.js              # Main layout wrapper
│   ├── Navigation.js          # Site navigation
│   └── Newsletter.js          # Newsletter subscription
├── content/                   # MDX content files
│   ├── books/                 # Book reviews and notes
│   └── posts/                 # Blog posts
├── contexts/                  # React contexts
│   ├── AuthContext.js         # Authentication context
│   └── LanguageContext.js     # Language switching context
├── data/                      # Static data files
│   ├── books.js               # Books data
│   └── posts.js               # Blog posts data
├── docs/                      # Documentation
├── pages/                     # Next.js pages
│   ├── _app.js                # App wrapper
│   ├── _document.js           # HTML document
│   ├── blog/                  # Blog pages
│   ├── library/               # Library pages
│   └── [other pages]
├── public/                    # Static assets
│   ├── images/                # Images and media
│   └── locales/               # Translation files
│       ├── en/common.json     # English translations
│       └── vi/common.json     # Vietnamese translations
├── scripts/                   # Build and utility scripts
├── styles/                    # CSS and styling
└── utils/                     # Utility functions
```

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm
- **Backend server** running on port 8000

### 1. Installation

```bash
cd frontend
npm install
```

### 2. Environment Setup (Optional)

Create `.env.local` if you need custom configuration:

```env
# Backend API URL (defaults to http://localhost:8000)
NEXT_PUBLIC_API_URL=http://localhost:8000

# Firebase configuration (if using authentication)
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
# ... other Firebase config
```

### 3. Development Server

```bash
npm run dev
```

The app will be available at http://localhost:3000

## Available Scripts

### Development
```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
```

### Content Management
```bash
npm run update-posts     # Update blog posts data from MDX files
```

### Translation Management
```bash
npm run translate:extract    # Extract translation keys from code
npm run translate:generate   # Generate translation template
npm run translate:import     # Import translations from Excel
npm run translate:validate   # Validate translation completeness
npm run translate           # Run all translation tasks
npm run translate:legacy    # Legacy translation script
```

### Backend Integration
```bash
npm run backend         # Start backend server (Unix)
npm run backend:win     # Start backend server (Windows)
npm run dev:all         # Start both frontend and backend
```

## Key Features

### 1. Multilingual Support

Complete internationalization with automatic language detection:

```javascript
// Using translations in components
import { useTranslation } from 'next-i18next';

function Component() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome.title')}</h1>;
}
```

**Translation files location:**
- English: `public/locales/en/common.json`
- Vietnamese: `public/locales/vi/common.json`

### 2. Content Management System

#### Blog Posts
Create MDX files in `content/posts/` with frontmatter:

```yaml
---
title: 'Your Blog Post Title'
subtitle: 'Optional subtitle'
date: 'January 1, 2024'
author:
  name: 'Your Name'
  avatar: '/images/avatar.jpg'
category: 'Technology'
tags: ['ai', 'development', 'product']
coverImage: '/images/blog/your-cover.jpg'
excerpt: 'Brief description of the post...'
---

Your MDX content here...
```

After adding posts, run:
```bash
npm run update-posts
```

#### Book Reviews
Add book reviews in `content/books/` with similar frontmatter structure.

### 3. AI Chat Integration

Components for AI interaction:
- `ChatInterface.js` - Main chat interface
- `FloatingChat.js` - Floating chat widget
- `finance/AIAssistant.js` - Finance-specific AI tools

### 4. Responsive Design

Built with Tailwind CSS and Framer Motion:
- Mobile-first responsive design
- Smooth animations and transitions
- Dark mode support
- Accessible components

### 5. Authentication (Optional)

Firebase integration for user authentication:
- Login/signup pages
- Protected routes
- User profile management

## Page Structure

### Main Pages
- **`/`** - Homepage with hero section
- **`/about`** - Professional profile and background
- **`/blog`** - Blog listing and individual posts
- **`/library`** - Reading library and book reviews
- **`/finance`** - Financial tools and AI assistant
- **`/impact`** - Social impact projects and tracking

### Authentication Pages
- **`/login`** - User login
- **`/signup`** - User registration
- **`/forgot-password`** - Password reset
- **`/profile`** - User profile management

## Component Architecture

### Layout Components
- `Layout.js` - Main wrapper with navigation and footer
- `Navigation.js` - Site navigation with language switcher
- `Footer.js` - Site footer
- `ThemeProvider.js` - Theme context provider

### Content Components
- `Hero.js` - Homepage hero section
- `About.js` - About page content
- `Newsletter.js` - Newsletter subscription
- `ResourceLibrary.js` - Resource library grid

### Blog Components
- `blog/BlogCard.js` - Individual blog post card
- `blog/CategoryFilter.js` - Category filtering
- `blog/FeaturedPost.js` - Featured post display
- `blog/TableOfContents.js` - Post table of contents

### Library Components
- `library/BookCard.js` - Individual book card
- `library/BookFilter.js` - Book filtering options

## Styling Guidelines

### Tailwind Configuration

Custom configuration in `tailwind.config.js`:
- Custom color palette
- Typography settings
- Animation utilities
- Responsive breakpoints

### CSS Modules

Some components use CSS modules for scoped styling:
- `styles/About.module.css`
- `styles/Chat.module.css`
- `styles/Hero.module.css`
- `styles/Navigation.module.css`

### Global Styles

Global CSS in `styles/globals.css` includes:
- Base styles and resets
- Custom utility classes
- Typography settings
- Animation keyframes

## Development Workflow

### 1. Adding New Content

**Blog Posts:**
1. Create MDX file in `content/posts/`
2. Add frontmatter and content
3. Run `npm run update-posts`
4. Restart development server

**Translations:**
1. Add new keys to translation files
2. Run `npm run translate:validate`
3. Update translations as needed

### 2. Adding New Components

1. Create component in appropriate directory
2. Add to exports if needed
3. Import and use in pages
4. Add styling with Tailwind or CSS modules

### 3. API Integration

Example API call with Axios:

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
});

// Chat API example
const sendMessage = async (message) => {
  try {
    const response = await api.post('/api/chat', { message });
    return response.data;
  } catch (error) {
    console.error('Chat error:', error);
    throw error;
  }
};
```

## Performance Optimization

### Built-in Optimizations
- **Next.js Image Optimization** for automatic image resizing
- **Code Splitting** with dynamic imports
- **Static Generation** for blog posts and static pages
- **Incremental Static Regeneration** for content updates

### Best Practices
- Use `next/image` for all images
- Implement lazy loading for heavy components
- Optimize bundle size with dynamic imports
- Cache API responses where appropriate

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Static Export (if needed)

```bash
# Add to next.config.js
module.exports = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  }
}

npm run build
```

### Environment Variables

For production, set these environment variables:
- `NEXT_PUBLIC_API_URL` - Backend API URL
- Firebase config variables (if using auth)
- Any other public configuration

## Troubleshooting

### Common Issues

1. **Build Errors**
   ```bash
   # Clear Next.js cache
   rm -rf .next
   npm run build
   ```

2. **Translation Issues**
   ```bash
   # Validate translations
   npm run translate:validate
   
   # Regenerate translation files
   npm run translate:generate
   ```

3. **API Connection Issues**
   - Check backend server is running on port 8000
   - Verify `NEXT_PUBLIC_API_URL` environment variable
   - Check CORS settings in backend

4. **Image Loading Issues**
   - Ensure images are in `public/images/`
   - Use proper image paths starting with `/`
   - Check image file formats and sizes

### Development Tips

- Use React Developer Tools for debugging
- Check browser console for client-side errors
- Use Next.js built-in error pages for debugging
- Monitor network tab for API call issues

## Documentation

Additional documentation available in `docs/`:
- `About.md` - About page customization
- `BlogAutomation.md` - Blog content management
- `components.md` - Component documentation
- `THEME.md` - Theming and styling guide
- `translation-guide.md` - Translation management

## Contributing

1. Follow the existing code structure
2. Use TypeScript-style JSDoc comments
3. Test changes across different screen sizes
4. Validate translations before committing
5. Update documentation as needed

## License

MIT License - see LICENSE file for details 