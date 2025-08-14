// Firebase configuration
import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// Environment detection
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Validation function
function validateFirebaseConfig() {
  const requiredFields = ['apiKey', 'authDomain', 'projectId', 'appId'];
  const missingFields = requiredFields.filter(field => !firebaseConfig[field]);
  
  if (missingFields.length > 0) {
    const envFile = isProduction ? '.env.production.local' : '.env.local';
    const errorMessage = `Missing required Firebase configuration: ${missingFields.join(', ')}`;
    const helpMessage = `Please check your ${envFile} file and ensure all required Firebase configuration values are set.`;
    
    console.error('🔥 Firebase Configuration Error:');
    console.error(`   ${errorMessage}`);
    console.error(`   ${helpMessage}`);
    
    if (isDevelopment) {
      console.error('   Environment detected: Development');
      console.error('   Expected file: .env.local');
    } else if (isProduction) {
      console.error('   Environment detected: Production');
      console.error('   Expected file: .env.production.local');
    }
    
    throw new Error(`Firebase configuration incomplete: ${missingFields.join(', ')}`);
  }
  
  // Log successful validation
  if (isDevelopment) {
    console.log('🔥 Firebase config validated successfully for development');
    console.log(`   Project ID: ${firebaseConfig.projectId}`);
    console.log(`   Auth Domain: ${firebaseConfig.authDomain}`);
  }
}

// Initialize Firebase
let app;
let auth;

try {
  // Validate configuration first
  validateFirebaseConfig();
  
  // Check if Firebase is already initialized to prevent multiple initialization
  if (!getApps().length) {
    app = initializeApp(firebaseConfig);
    console.log('🔥 Firebase initialized successfully');
  } else {
    app = getApps()[0];
    console.log('🔥 Using existing Firebase app');
  }
  
  auth = getAuth(app);
  
  // Additional auth configuration
  if (isDevelopment) {
    // Enable auth state persistence in development
    auth.settings = {
      ...auth.settings,
      // You can add development-specific auth settings here
    };
  }
  
} catch (error) {
  console.error('🔥 Critical Firebase initialization error:', error);
  console.error('   This will prevent authentication from working.');
  
  if (isDevelopment) {
    console.error('   Troubleshooting steps for development:');
    console.error('   1. Check that .env.local exists in the frontend directory');
    console.error('   2. Verify all NEXT_PUBLIC_FIREBASE_* variables are set');
    console.error('   3. Ensure Firebase project settings are correct');
  } else {
    console.error('   Troubleshooting steps for production:');
    console.error('   1. Check that .env.production.local is properly deployed');
    console.error('   2. Verify production Firebase project configuration');
    console.error('   3. Ensure environment variables are accessible at build time');
  }
  
  // In development, we might want to continue without Firebase for testing
  // In production, this should probably be a hard failure
  if (isProduction) {
    throw error;
  }
}

export { auth };
export default app; 