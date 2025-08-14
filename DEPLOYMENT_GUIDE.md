# Deployment Guide

This guide covers deploying the Human-Technology Catalyst personal branding website with AI chat functionality.

## 🏗️ Architecture Overview

- **Frontend**: Next.js 14 deployed on Vercel
- **Backend**: FastAPI deployed on Vercel (serverless functions)
- **Database**: SQLite (local) / Firebase Firestore (production)
- **Authentication**: Firebase Auth
- **AI**: Claude API (Anthropic)

## 📋 Pre-deployment Checklist

### ✅ Completed Setup Tasks
- [x] Frontend dependencies installed
- [x] Backend dependencies installed  
- [x] Environment templates created
- [x] Production build successful
- [x] Backend imports verified

### 🔧 Required Environment Setup

#### 1. Backend Environment Variables
Copy `backend/env.template` to `backend/.env` and configure:

```env
# Required for production
ANTHROPIC_API_KEY=your_actual_anthropic_api_key
ENVIRONMENT=production
DEBUG=false

# Firebase Configuration
GOOGLE_APPLICATION_CREDENTIALS=path/to/firebase-service-account.json
DISABLE_FIREBASE_AUTH=false

# CORS for production domain
CORS_ORIGINS=https://your-domain.vercel.app,http://localhost:3000
```

#### 2. Frontend Environment Variables
Copy `frontend/env.template` to `frontend/.env.local` and configure:

```env
# Production API endpoint
NEXT_PUBLIC_API_BASE_URL=https://your-backend-domain.vercel.app/api/v1

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## 🚀 Deployment Steps

### Step 1: Deploy Backend (FastAPI on Vercel)

1. **Prepare backend for Vercel**:
   ```bash
   cd backend
   # Ensure vercel.json is configured
   ```

2. **Deploy to Vercel**:
   ```bash
   vercel --prod
   ```

3. **Configure environment variables in Vercel**:
   - Go to Vercel dashboard → Project → Settings → Environment Variables
   - Add all variables from your `.env` file
   - For Firebase: Upload service account JSON as a file or encode as base64

### Step 2: Deploy Frontend (Next.js on Vercel)

1. **Update API endpoint**:
   - Update `NEXT_PUBLIC_API_BASE_URL` with your backend URL
   
2. **Deploy to Vercel**:
   ```bash
   cd frontend
   vercel --prod
   ```

3. **Configure environment variables**:
   - Add all `NEXT_PUBLIC_*` variables in Vercel dashboard

### Step 3: Configure Firebase

1. **Set up Firebase projects** (development and production)
2. **Enable Authentication** with Email/Password
3. **Add authorized domains**:
   - Development: `localhost`
   - Production: `your-domain.vercel.app`
4. **Download service account keys** for backend

### Step 4: Update CORS Settings

Update backend `CORS_ORIGINS` to include your production domain:
```env
CORS_ORIGINS=https://your-frontend.vercel.app,http://localhost:3000
```

## 🔍 Testing & Verification

### Frontend Testing
- [ ] Pages load correctly
- [ ] Firebase authentication works
- [ ] API calls to backend succeed
- [ ] Internationalization (i18n) works
- [ ] All routes accessible

### Backend Testing
- [ ] Health check endpoint responds
- [ ] Authentication middleware works
- [ ] AI chat functionality works
- [ ] CORS headers correct
- [ ] Rate limiting functional

### Integration Testing
- [ ] Complete user flow works
- [ ] Chat interface connects to backend
- [ ] User registration/login flows
- [ ] Content management works

## 🐛 Common Issues & Solutions

### Build Issues
- **CSS warnings**: PostCSS warnings are non-breaking, safe to ignore
- **xlsx vulnerability**: Known issue, can be addressed post-deployment

### Environment Issues
- **Missing Firebase config**: Ensure all `NEXT_PUBLIC_FIREBASE_*` variables are set
- **API connection fails**: Check `NEXT_PUBLIC_API_BASE_URL` matches backend URL
- **CORS errors**: Update `CORS_ORIGINS` with correct domains

### Authentication Issues
- **Firebase init fails**: Verify project IDs and API keys
- **Token verification fails**: Ensure same Firebase project used for frontend/backend
- **Unauthorized errors**: Check Firebase service account permissions

## 📊 Performance Optimizations

### Frontend
- Static page generation for blog posts
- Image optimization with Next.js
- Code splitting and lazy loading
- CSS optimization with Tailwind

### Backend
- Rate limiting implemented
- Caching configuration available
- Optimized API responses
- Serverless architecture

## 🔐 Security Considerations

- Environment variables properly secured
- Firebase service account restricted permissions
- CORS properly configured
- Rate limiting active
- Input validation on all endpoints

## 📈 Monitoring & Analytics

### Recommended Additions
- Vercel Analytics for frontend performance
- Error tracking (Sentry)
- API monitoring
- User analytics

## 🔄 CI/CD Pipeline

Current setup supports:
- Automatic deployments on git push
- Preview deployments for pull requests
- Environment-specific configurations
- Build optimization

## 📝 Post-Deployment Tasks

1. **Test all functionality** in production
2. **Monitor performance** and error rates
3. **Set up alerts** for downtime
4. **Document any issues** and solutions
5. **Plan regular updates** and maintenance

## 🆘 Support & Troubleshooting

### Quick Fixes
- Clear browser cache if styling issues occur
- Check Vercel function logs for backend errors
- Verify environment variables in Vercel dashboard
- Test API endpoints directly via browser/Postman

### Logs Access
- Frontend: Vercel dashboard → Functions tab
- Backend: Vercel dashboard → Functions tab
- Firebase: Firebase Console → Authentication/Database

---

**Note**: This deployment guide assumes Vercel hosting. Adjust configurations for other platforms as needed.
