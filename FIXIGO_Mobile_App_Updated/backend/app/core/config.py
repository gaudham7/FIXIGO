from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    app_env: str = "development"
    api_v1_prefix: str = "/api/v1"
    database_url: str = "postgresql+psycopg://fixigo:fixigo_dev_password@localhost:5432/fixigo"
    redis_url: str = "redis://localhost:6379/0"
    cors_allowed_origins: str = "http://localhost:3000,http://localhost:8081"

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    @property
    def cors_allowed_origins_list(self) -> list[str]:
        return [origin.strip() for origin in self.cors_allowed_origins.split(",") if origin.strip()]

settings = Settings()
# Expose the parsed list to the application without complicating environment parsing.
settings.cors_allowed_origins = settings.cors_allowed_origins_list
