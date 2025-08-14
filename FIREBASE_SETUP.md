# Firebase Authentication Setup Guide

This guide covers the complete setup of Firebase Authentication for both development and production environments.

## 🔧 Environment Configuration

### Frontend Environment Files

#### Development (`.env.local`)
```env
# Development Environment Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:8001/api/v1

# Firebase Configuration for Development
NEXT_PUBLIC_FIREBASE_API_KEY="your-dev-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-dev-firebase-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-dev-firebase-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-dev-firebase-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-dev-firebase-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-dev-firebase-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-dev-firebase-measurement-id"
```

#### Production (`.env.production.local`)
```env
# Production API URL - Update this to your actual production domain
NEXT_PUBLIC_API_BASE_URL=https://your-production-domain.com/api/v1

# Firebase Configuration for Production
NEXT_PUBLIC_FIREBASE_API_KEY="your-production-firebase-api-key"
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN="your-production-firebase-auth-domain"
NEXT_PUBLIC_FIREBASE_PROJECT_ID="your-production-firebase-project-id"
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET="your-production-firebase-storage-bucket"
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID="your-production-firebase-messaging-sender-id"
NEXT_PUBLIC_FIREBASE_APP_ID="your-production-firebase-app-id"
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID="your-production-firebase-measurement-id"
```

### Backend Environment Files

#### Main Environment (`.env`)
```env
# Firebase Configuration
# Set to true to disable Firebase auth for local development
DISABLE_FIREBASE_AUTH=false
# Path to Firebase service account key file
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/firebase-service-account.json
```

#### Development (`.env.development`)
```env
ENVIRONMENT=development
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/dev-firebase-service-account.json
DISABLE_FIREBASE_AUTH=false
```

#### Production (`.env.production`)
```env
ENVIRONMENT=production
GOOGLE_APPLICATION_CREDENTIALS=path/to/your/prod-firebase-service-account.json
DISABLE_FIREBASE_AUTH=false
```

## 🔥 Firebase Project Setup

### 1. Create Firebase Projects

1. **Development Project**: Create a Firebase project for development
2. **Production Project**: Create a separate Firebase project for production

### 2. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Configure **Authorized domains** for your environments:
   - Development: `localhost`
   - Production: `your-production-domain.com`

### 3. Get Configuration Keys

#### Frontend Configuration
1. Go to **Project Settings** → **Your apps**
2. Select your web app or create a new one
3. Copy the config object values to your environment files

#### Backend Configuration (Service Account)
1. Go to **Project Settings** → **Service accounts**
2. Click **Generate new private key**
3. Download the JSON file and save it securely
4. Update `GOOGLE_APPLICATION_CREDENTIALS` path in your environment files

## 🚀 Deployment Checklist

### Development Environment

- [ ] Create `.env.local` with development Firebase config
- [ ] Download development service account key
- [ ] Update `GOOGLE_APPLICATION_CREDENTIALS` path in backend `.env`
- [ ] Test login flow at `http://localhost:3001/login`
- [ ] Verify Firebase initialization logs in browser console

### Production Environment

- [ ] Create `.env.production.local` with production Firebase config
- [ ] Download production service account key
- [ ] Securely store service account key on production server
- [ ] Update `GOOGLE_APPLICATION_CREDENTIALS` path in production environment
- [ ] Configure production authorized domains in Firebase Console
- [ ] Test production build: `npm run build`
- [ ] Deploy and test login functionality

## 🔍 Troubleshooting

### Common Issues

#### 1. "Missing required Firebase configuration"
**Symptom**: Error during Firebase initialization
**Solution**: 
- Check that all `NEXT_PUBLIC_FIREBASE_*` variables are set
- Verify environment file exists (`.env.local` or `.env.production.local`)
- Ensure no variables are empty or undefined

#### 2. "Firebase Admin SDK initialization failed"
**Symptom**: Backend authentication errors
**Solution**:
- Verify `GOOGLE_APPLICATION_CREDENTIALS` path is correct
- Ensure service account key file has proper permissions (readable by application)
- Check that service account has Firebase Admin privileges

#### 3. "Invalid token" errors
**Symptom**: Authentication fails after login
**Solution**:
- Ensure frontend and backend are using the same Firebase project
- Verify authorized domains are configured correctly
- Check that token is being sent with `Bearer` prefix

#### 4. CORS issues
**Symptom**: Network errors when calling backend
**Solution**:
- Update `CORS_ORIGINS` in backend environment files
- Ensure production domain is whitelisted

### Debug Mode

#### Frontend Debug
- Open browser developer console
- Look for Firebase initialization logs (🔥 prefixed messages)
- Check Network tab for failed API calls

#### Backend Debug
- Check server logs for Firebase Admin SDK initialization messages
- Look for authentication error details (🔥 prefixed messages)
- Verify service account file is accessible

#### Development Bypass
For local development without Firebase:
```env
DISABLE_FIREBASE_AUTH=true
DEV_FAKE_USER_EMAIL=dev@example.com
```

## 🔐 Security Considerations

### Environment Variables
- **Never** commit `.env.local` or `.env.production.local` to version control
- Use `.env.example` files to document required variables
- Store production secrets securely (environment variables, secret management systems)

### Service Account Keys
- Keep service account keys secure and never commit to version control
- Use different service accounts for development and production
- Regularly rotate service account keys
- Grant minimal required permissions

### Authorized Domains
- Only add legitimate domains to Firebase authorized domains
- Remove test domains from production projects
- Use HTTPS for production environments

## 📋 Environment Variables Reference

### Required Frontend Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase API key | `AIzaSyA...` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain | `project.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID | `project-id-123` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID | `1:123:web:abc123` |

### Required Backend Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `GOOGLE_APPLICATION_CREDENTIALS` | Path to service account key | `/path/to/key.json` |
| `DISABLE_FIREBASE_AUTH` | Disable auth for development | `false` |
| `DEV_FAKE_USER_EMAIL` | Fake user email for development | `dev@example.com` |

## 🎯 Testing Your Setup

### Manual Testing
1. **Frontend**: Visit `/login` page and attempt to sign in
2. **Backend**: Check that authenticated API endpoints require valid tokens
3. **Error Handling**: Test with invalid credentials to verify error messages

### Automated Testing
- Create test user accounts in Firebase Console
- Test authentication flows with valid/invalid credentials
- Verify token refresh and expiration handling