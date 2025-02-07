from pydantic_settings import BaseSettings
from typing import Optional
import re

class Settings(BaseSettings):
    # API Keys
    ANTHROPIC_API_KEY: str

    # Server Configuration
    PORT: int = 8000
    ENVIRONMENT: str = "development"

    # CORS Settings
    CORS_ORIGINS: str = "http://localhost:3000"

    def validate_api_key(self) -> bool:
        """Validate Anthropic API key format"""
        pattern = r'^sk-ant-api\d{2}-[a-zA-Z0-9-]{32,}$'
        return bool(re.match(pattern, self.ANTHROPIC_API_KEY))

    class Config:
        env_file = ".env"
        case_sensitive = True

    def validate_api_key(self) -> bool:
        """Validate that API key is properly formatted."""
        return bool(self.ANTHROPIC_API_KEY and self.ANTHROPIC_API_KEY.startswith('sk-')) 