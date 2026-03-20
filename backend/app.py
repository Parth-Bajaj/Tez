from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from config import settings
from middleware.error_handler import register_error_handlers
from middleware.request_logger import RequestLoggerMiddleware
from routes.auth_routes import router as auth_router
from routes.blockchain_routes import router as blockchain_router
from routes.news_routes import router as news_router
from routes.prediction_routes import router as prediction_router
from routes.report_routes import router as report_router
from routes.user_routes import router as user_router

app = FastAPI(title=settings.app_name, version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(RequestLoggerMiddleware)

app.include_router(auth_router, prefix=f"{settings.api_prefix}/auth", tags=["auth"])
app.include_router(news_router, prefix=f"{settings.api_prefix}/news", tags=["news"])
app.include_router(
    prediction_router, prefix=f"{settings.api_prefix}/prediction", tags=["prediction"]
)
app.include_router(
    blockchain_router, prefix=f"{settings.api_prefix}/blockchain", tags=["blockchain"]
)
app.include_router(report_router, prefix=f"{settings.api_prefix}/reports", tags=["reports"])
app.include_router(user_router, prefix=f"{settings.api_prefix}/users", tags=["users"])

register_error_handlers(app)


@app.get("/")
def read_root():
    return {"message": "Tez API is running."}
