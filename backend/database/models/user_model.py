from dataclasses import dataclass


@dataclass
class UserModel:
    id: str
    name: str
    email: str
    password: str
    role: str = "reader"

