from fastapi import APIRouter, Depends

from controllers.user_controller import get_profile
from middleware.auth_middleware import require_auth

router = APIRouter()


@router.get("/me")
def user_profile_route(token: str = Depends(require_auth)):
    return get_profile(token)

