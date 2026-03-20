from pydantic import BaseModel, Field


class ReportCreate(BaseModel):
    newsId: str = Field(..., min_length=2)
    reason: str = Field(..., min_length=4)
    notes: str = ""

