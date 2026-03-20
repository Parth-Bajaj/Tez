from fastapi import APIRouter

from controllers.auth_controller import login, signup
from database.schemas.user_schema import UserCreate, UserLogin

router = APIRouter()


@router.post("/login")
def login_route(payload: UserLogin):
    return login(payload)


@router.post("/signup")
def signup_route(payload: UserCreate):
    return signup(payload)

