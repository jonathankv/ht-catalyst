from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional
from enum import Enum

class Environment(str, Enum):
    DEVELOPMENT = "development"
    PRODUCTION = "production"
    TESTING = "testing"

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "Human-Technology Catalyst API"
    
    # Environment
    ENVIRONMENT: Environment = Environment.DEVELOPMENT
    DEBUG: bool = False
    
    # API Keys
    ANTHROPIC_API_KEY: str
    BACKUP_API_KEY: Optional[str] = None

    # CORS Settings
    CORS_ORIGINS: str = "http://localhost:3000,http://localhost:3001,https://your-frontend-url.vercel.app"
    
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

    # Pydantic v2 settings configuration
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding='utf-8',
        case_sensitive=True,
        extra="ignore",  # ignore unrelated env vars like NEXT_PUBLIC_*
    )

# Create global settings instance
settings = Settings()