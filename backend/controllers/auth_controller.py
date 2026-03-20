from services.auth_service import login_user, signup_user
from utils.response_helper import success_response


def login(payload):
    return success_response(login_user(payload), "Login successful.")


def signup(payload):
    return success_response(signup_user(payload), "Account created successfully.")

