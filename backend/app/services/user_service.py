from dataclasses import dataclass
from typing import Dict, Optional

from app.core.security import get_password_hash, verify_password


ALLOWED_ROLES = {"admin", "reporter", "user"}


@dataclass
class UserRecord:
    username: str
    hashed_password: str
    role: str


class InMemoryUserStore:
    """Small in-memory auth store for local development and tests."""

    def __init__(self) -> None:
        self._users: Dict[str, UserRecord] = {}

    def create_user(self, username: str, password: str, role: str = "user") -> UserRecord:
        normalized_username = username.strip().lower()
        normalized_role = role.strip().lower()

        if not normalized_username:
            raise ValueError("Username cannot be empty.")
        if not password:
            raise ValueError("Password cannot be empty.")
        if normalized_role not in ALLOWED_ROLES:
            raise ValueError(f"Role must be one of: {', '.join(sorted(ALLOWED_ROLES))}.")
        if normalized_username in self._users:
            raise ValueError("Username already exists.")

        user = UserRecord(
            username=normalized_username,
            hashed_password=get_password_hash(password),
            role=normalized_role,
        )
        self._users[normalized_username] = user
        return user

    def authenticate(self, username: str, password: str) -> Optional[UserRecord]:
        normalized_username = username.strip().lower()
        user = self._users.get(normalized_username)
        if user is None:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        return user

    def get_user(self, username: str) -> Optional[UserRecord]:
        return self._users.get(username.strip().lower())


user_store = InMemoryUserStore()
