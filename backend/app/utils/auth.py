from typing import Optional
from fastapi import Depends, HTTPException, Header
import firebase_admin
from firebase_admin import auth as fb_auth, credentials
import os
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

_initialized = False


def _ensure_initialized() -> None:
    """
    Initialize Firebase Admin SDK with proper error handling and logging.
    
    Supports multiple initialization methods:
    1. Service account key file via GOOGLE_APPLICATION_CREDENTIALS
    2. Application Default Credentials (for production environments)
    3. Development mode with disabled auth
    """
    global _initialized
    if _initialized:
        return
    
    # Check if Firebase auth is disabled for development
    if os.getenv("DISABLE_FIREBASE_AUTH", "false").lower() == "true":
        logger.warning("🔥 Firebase authentication is DISABLED for development")
        logger.warning("   All requests will use a dummy user for authentication")
        _initialized = True
        return
    
    try:
        if not firebase_admin._apps:
            cred: Optional[credentials.Base] = None
            cred_source = "unknown"
            
            # Try service account key file first
            credentials_path = os.getenv("GOOGLE_APPLICATION_CREDENTIALS")
            if credentials_path:
                if os.path.exists(credentials_path):
                    cred = credentials.Certificate(credentials_path)
                    cred_source = f"Service Account Key: {credentials_path}"
                    logger.info(f"🔥 Using Firebase service account key: {credentials_path}")
                else:
                    logger.error(f"🔥 Firebase service account key file not found: {credentials_path}")
                    raise FileNotFoundError(f"Service account key file not found: {credentials_path}")
            else:
                # Fall back to Application Default Credentials
                try:
                    cred = credentials.ApplicationDefault()
                    cred_source = "Application Default Credentials"
                    logger.info("🔥 Using Firebase Application Default Credentials")
                except Exception as adc_error:
                    logger.error(f"🔥 Failed to initialize Application Default Credentials: {adc_error}")
                    raise adc_error
            
            # Initialize Firebase Admin SDK
            firebase_admin.initialize_app(cred)
            logger.info(f"🔥 Firebase Admin SDK initialized successfully")
            logger.info(f"   Credential source: {cred_source}")
            
        _initialized = True
        
    except Exception as exc:
        logger.error(f"🔥 Critical Firebase Admin SDK initialization error: {exc}")
        logger.error("   This will prevent backend authentication from working")
        logger.error("   Troubleshooting steps:")
        logger.error("   1. Verify GOOGLE_APPLICATION_CREDENTIALS path is correct")
        logger.error("   2. Ensure the service account key file has proper permissions")
        logger.error("   3. Check that the service account has Firebase Admin privileges")
        logger.error("   4. For local development, set DISABLE_FIREBASE_AUTH=true to bypass")
        
        # Allow running without Firebase in local dev only if explicitly disabled
        if os.getenv("DISABLE_FIREBASE_AUTH", "false").lower() != "true":
            raise HTTPException(
                status_code=500,
                detail=f"Firebase Admin SDK initialization failed: {str(exc)}"
            )


def verify_bearer_token(authorization: Optional[str] = Header(default=None, alias="Authorization")) -> str:
    """
    Verify Firebase ID token from Authorization header.
    Returns the user email if valid, else raises 401.
    
    Args:
        authorization: The Authorization header containing "Bearer <token>"
        
    Returns:
        str: The verified user's email address
        
    Raises:
        HTTPException: 401 if token is missing, invalid, or verification fails
    """
    _ensure_initialized()
    
    # Development mode bypass
    if os.getenv("DISABLE_FIREBASE_AUTH", "false").lower() == "true":
        fake_email = os.getenv("DEV_FAKE_USER_EMAIL", "dev@example.com")
        logger.info(f"🔥 Using fake user for development: {fake_email}")
        return fake_email

    # Validate Authorization header format
    if not authorization:
        logger.warning("🔥 Authentication failed: Missing Authorization header")
        raise HTTPException(
            status_code=401, 
            detail="Missing Authorization header. Expected format: 'Bearer <firebase_id_token>'"
        )
    
    if not authorization.startswith("Bearer "):
        logger.warning(f"🔥 Authentication failed: Invalid Authorization header format")
        raise HTTPException(
            status_code=401, 
            detail="Invalid Authorization header format. Expected: 'Bearer <firebase_id_token>'"
        )
    
    # Extract token
    token = authorization.split(" ", 1)[1]
    if not token:
        logger.warning("🔥 Authentication failed: Empty token")
        raise HTTPException(status_code=401, detail="Empty token")
    
    # Verify Firebase ID token
    try:
        logger.debug("🔥 Verifying Firebase ID token...")
        decoded = fb_auth.verify_id_token(token)
        
        # Extract user information
        email = decoded.get("email")
        uid = decoded.get("uid")
        
        if not email:
            logger.warning(f"🔥 Authentication failed: Token missing email (uid: {uid})")
            raise HTTPException(
                status_code=401, 
                detail="Token is valid but missing email. Ensure email is verified in Firebase."
            )
        
        logger.info(f"🔥 Authentication successful: {email}")
        return email
        
    except fb_auth.ExpiredIdTokenError:
        logger.warning("🔥 Authentication failed: Token expired")
        raise HTTPException(status_code=401, detail="Token has expired. Please sign in again.")
        
    except fb_auth.RevokedIdTokenError:
        logger.warning("🔥 Authentication failed: Token revoked")
        raise HTTPException(status_code=401, detail="Token has been revoked. Please sign in again.")
        
    except fb_auth.InvalidIdTokenError as e:
        logger.warning(f"🔥 Authentication failed: Invalid token - {str(e)}")
        raise HTTPException(status_code=401, detail="Invalid token format or signature.")
        
    except Exception as e:
        logger.error(f"🔥 Authentication error: Unexpected error during token verification - {str(e)}")
        raise HTTPException(status_code=401, detail="Token verification failed.")


