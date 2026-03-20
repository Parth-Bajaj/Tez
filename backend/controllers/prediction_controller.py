from services.prediction_service import predict_article
from utils.response_helper import success_response


def predict(payload):
    data = predict_article(payload.title, payload.content, payload.source)
    return success_response(data, "Prediction completed.")

