import os

class Settings:
    PROJECT_NAME: str = "Fake News Detection API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = ""
    BACKEND_CORS_ORIGINS: list[str] = [
        origin.strip()
        for origin in os.getenv(
            "BACKEND_CORS_ORIGINS",
            "http://localhost,http://127.0.0.1,http://localhost:3000,http://127.0.0.1:3000,http://localhost:5173,http://127.0.0.1:5173",
        ).split(",")
        if origin.strip()
    ]
    
    # JWT Config
    SECRET_KEY: str = os.getenv("SECRET_KEY", "b398df90-a39c-4903-a447-3807d4b0f9f3_development_key")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7 # 7 days
    BLOCKCHAIN_RPC_URL: str = os.getenv("RPC_URL", "")
    BLOCKCHAIN_PRIVATE_KEY: str = os.getenv("PRIVATE_KEY", "")
    BLOCKCHAIN_CONTRACT_ADDRESS: str = os.getenv("CONTRACT_ADDRESS", "")
    BLOCKCHAIN_CHAIN_ID: int = int(os.getenv("CHAIN_ID", "11155111"))
    BLOCKCHAIN_ARTIFACT_PATH: str = os.getenv(
        "BLOCKCHAIN_ARTIFACT_PATH",
        os.path.abspath(
            os.path.join(
                os.path.dirname(__file__),
                "../../../blockchain/artifacts/contracts/NewsVerification.sol/NewsVerification.json",
            )
        ),
    )

settings = Settings()
