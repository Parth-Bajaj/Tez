from typing import Optional

from fastapi import Header, HTTPException


def require_auth(authorization: Optional[str] = Header(default=None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Authorization header is required.")
    if authorization.startswith("Bearer "):
        return authorization.replace("Bearer ", "", 1)
    return authorization

