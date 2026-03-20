from services.auth_service import get_user_from_token
from utils.response_helper import success_response


def get_profile(token: str):
    return success_response(get_user_from_token(token), "User profile fetched successfully.")

