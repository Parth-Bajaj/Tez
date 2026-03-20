from typing import Optional

from pydantic import BaseModel, Field


class NewsCreate(BaseModel):
    title: str = Field(..., min_length=8)
    summary: Optional[str] = None
    content: str = Field(..., min_length=40)
    category: str = "General"
    source: str = Field(..., min_length=2)
    publishedAt: Optional[str] = None
    author: str = "Editorial Desk"
    image: str = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80"


class NewsPredictionRequest(BaseModel):
    title: str = ""
    content: str
    source: str = ""
