from fastapi import APIRouter

from controllers.prediction_controller import predict
from database.schemas.news_schema import NewsPredictionRequest

router = APIRouter()


@router.post("/predict")
def predict_route(payload: NewsPredictionRequest):
    return predict(payload)

