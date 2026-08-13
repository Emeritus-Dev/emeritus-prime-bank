from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Emeritus Prime Bank API"
    SECRET_KEY: str = "EMERITUS_PRIME_SECRET_KEY_CHANGE_IN_PRODUCTION_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24

    class Config:
        env_file = ".env"

settings = Settings()