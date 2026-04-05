from pydantic import BaseModel
from typing import Optional

class PredictRequest(BaseModel):
    text: str

class PredictStoreRequest(PredictRequest):
    # Additional future fields for storing
    pass

class UserCreate(BaseModel):
    username: str
    password: str
    role: Optional[str] = "user"

class UserLogin(BaseModel):
    username: str
    password: str
