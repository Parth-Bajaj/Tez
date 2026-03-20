from dataclasses import asdict
from uuid import uuid4

from fastapi import HTTPException

from database.db import db
from database.models.user_model import UserModel


def _build_session(user: UserModel):
    user_payload = asdict(user)
    user_payload.pop("password", None)
    return {
        "user": user_payload,
        "token": f"tez-token::{user.id}::{user.role}",
    }


def signup_user(payload):
    existing = next((user for user in db.users.values() if user.email == payload.email), None)
    if existing:
        raise HTTPException(status_code=409, detail="User already exists.")

    user = UserModel(
        id=str(uuid4()),
        name=payload.name,
        email=payload.email,
        password=payload.password,
        role="reader",
    )
    db.users[user.id] = user
    return _build_session(user)


def login_user(payload):
    user = next((entry for entry in db.users.values() if entry.email == payload.email), None)
    if not user or user.password != payload.password:
        raise HTTPException(status_code=401, detail="Invalid email or password.")
    return _build_session(user)


def get_user_from_token(token: str):
    if not token or "tez-token::" not in token:
        raise HTTPException(status_code=401, detail="Invalid token.")
    user_id = token.split("::")[1]
    user = db.users.get(user_id)
    if not user:
        raise HTTPException(status_code=401, detail="User not found.")
    user_payload = asdict(user)
    user_payload.pop("password", None)
    return user_payload
