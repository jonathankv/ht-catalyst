from pydantic_settings import BaseSettings
from typing import Optional
from enum import Enum

class Environment(str, Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    TESTING = "testing"

class Settings(BaseSettings):
    # Environment
    ENVIRONMENT: Environment = Environment.DEVELOPMENT

    # API Keys
    ANTHROPIC_API_KEY: str
    BACKUP_API_KEY: Optional[str] = None  # For fallback/testing

    # Server Configuration
    PORT: int = 8000
    HOST: str = "0.0.0.0"
    DEBUG: bool = False

    # CORS Settings  
    CORS_ORIGINS: str = "http://localhost:3000,https://ht-catalyst-frontend.vercel.app"
    
    # AI Configuration
    AI_MODEL: str = "claude-3-opus-20240229"
    MAX_TOKENS: int = 1024
    TEMPERATURE: float = 0.7
    
    # Rate Limiting
    RATE_LIMIT_PER_MINUTE: int = 60
    
    # Caching
    ENABLE_CACHE: bool = False
    CACHE_TTL: int = 3600  # 1 hour

    def validate_api_key(self) -> bool:
        """Validate that API key is properly formatted."""
        return bool(self.ANTHROPIC_API_KEY and self.ANTHROPIC_API_KEY.startswith('sk-'))

    @property
    def is_production(self) -> bool:
        return self.ENVIRONMENT == Environment.PRODUCTION

    class Config:
        env_file = ".env"
        env_file_encoding = 'utf-8'
        case_sensitive = True

        @classmethod
        def customise_sources(cls, init_settings, env_settings, file_secret_settings):
            # Prioritize environment variables over .env file
            return env_settings, init_settings, file_secret_settings 