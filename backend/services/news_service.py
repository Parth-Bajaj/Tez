from dataclasses import asdict
from datetime import datetime
from typing import Optional
from uuid import uuid4

from database.db import db
from database.models.news_model import NewsModel
from services.blockchain_service import store_news_hash
from services.prediction_service import predict_article
from services.summarizer_service import generate_summary
from utils.validators import validate_news_payload


def serialize_news(item: NewsModel):
    payload = asdict(item)
    payload["publishedAt"] = payload.pop("published_at")
    payload["credibilityScore"] = payload.pop("credibility_score")
    payload["txHash"] = payload.pop("tx_hash")
    payload["storyHash"] = payload.pop("story_hash")
    return payload


def get_all_news(category: Optional[str] = None):
    items = list(db.news.values())
    if category:
        items = [item for item in items if item.category.lower() == category.lower()]
    items.sort(key=lambda item: item.published_at, reverse=True)
    return [serialize_news(item) for item in items]


def get_news_by_id(news_id: str):
    item = db.news.get(news_id)
    return serialize_news(item) if item else None


def create_news_article(payload):
    validate_news_payload(payload.title, payload.content)
    prediction = predict_article(payload.title, payload.content, payload.source)
    ledger_record = store_news_hash(
        payload.title,
        payload.content,
        prediction["label"],
        prediction["credibilityScore"],
    )

    item = NewsModel(
        id=str(uuid4()),
        title=payload.title,
        summary=payload.summary or generate_summary(payload.content),
        content=payload.content,
        category=payload.category,
        source=payload.source,
        published_at=payload.publishedAt or datetime.utcnow().isoformat() + "Z",
        author=payload.author,
        image=payload.image,
        credibility_score=prediction["credibilityScore"],
        prediction=prediction["label"],
        confidence=prediction["confidence"],
        tx_hash=ledger_record["txHash"],
        story_hash=ledger_record["storyHash"],
    )

    db.news[item.id] = item
    return serialize_news(item)
