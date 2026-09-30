from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_name: str = "Synapse API"
    environment: str = "development"
    database_url: str = "sqlite:///./synapse.db"
    jwt_secret: str = "dev-only-change-this-to-a-64-character-random-secret-value-123456"
    jwt_algorithm: str = "HS256"
    access_token_minutes: int = 15
    refresh_token_days: int = 30
    otp_minutes: int = 10
    dev_otp: bool = True
    cors_origins: str = "http://localhost:5173,http://127.0.0.1:5173"
    ai_api_url: str = ""
    ai_api_key: str = ""
    ai_model: str = "gpt-5.6-mini"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()
