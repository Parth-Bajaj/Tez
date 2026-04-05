from pydantic import BaseModel, ConfigDict, Field
from typing import List, Dict, Union, Optional

class HealthResponse(BaseModel):
    status: str

class PredictResponse(BaseModel):
    model_config = ConfigDict(protected_namespaces=())
    label: str
    confidence: float
    model_breakdown: Optional[Dict[str, str]] = None
    important_words: Optional[List[str]] = None
    explanation: Optional[str] = None
    error: Optional[str] = None

class PredictStoreResponse(PredictResponse):
    txHash: str
    hash: str
    blockNumber: Optional[int] = None

class Token(BaseModel):
    access_token: str
    token_type: str

class ProfileResponse(BaseModel):
    username: str
    role: str
    history: List[Dict[str, Union[str, float, None]]] = Field(default_factory=list)


class AnalyticsResponse(BaseModel):
    total_checked: int
    fake_count: int
    real_count: int
    fake_percentage: float
    top_keywords: List[str] = Field(default_factory=list)


class VerifyRecordResponse(BaseModel):
    contentHash: str
    result: str
    confidence: int
    timestamp: int
    txHash: Optional[str] = None
    blockNumber: Optional[int] = None
