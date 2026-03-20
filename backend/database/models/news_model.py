from dataclasses import dataclass


@dataclass
class NewsModel:
    id: str
    title: str
    summary: str
    content: str
    category: str
    source: str
    published_at: str
    author: str
    image: str
    credibility_score: int
    prediction: str
    confidence: float
    tx_hash: str
    story_hash: str

