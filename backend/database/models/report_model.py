from dataclasses import dataclass


@dataclass
class ReportModel:
    id: str
    news_id: str
    reason: str
    notes: str
    status: str
    created_at: str

