from pydantic_settings import BaseSettings
from functools import lru_cache


class Settings(BaseSettings):
    app_name: str = "Smart Data Analyst"
    debug: bool = True

    # API
    dashscope_api_key: str = ""
    dashscope_model: str = "qwen3"

    # Database
    database_url: str = "sqlite:///./data/business.db"
    session_db_url: str = "sqlite:///./data/sessions.db"

    # CORS
    cors_origins: list[str] = ["http://localhost:5173", "http://127.0.0.1:5173"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


@lru_cache()
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
