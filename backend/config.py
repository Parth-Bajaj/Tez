import os
from dataclasses import dataclass, field
from typing import List


@dataclass(frozen=True)
class Settings:
    app_name: str = os.getenv("APP_NAME", "Tez API")
    api_prefix: str = os.getenv("API_PREFIX", "/api")
    cors_origins: List[str] = field(
        default_factory=lambda: os.getenv(
            "CORS_ORIGINS",
            "http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
    )
    ledger_network: str = os.getenv("LEDGER_NETWORK", "Polygon Amoy")


settings = Settings()
