from typing import Optional

from fastapi import APIRouter, HTTPException, Query

from controllers.news_controller import create_news, list_news, retrieve_news
from database.schemas.news_schema import NewsCreate

router = APIRouter()


@router.get("")
def list_news_route(category: Optional[str] = Query(default=None)):
    return list_news(category)


@router.get("/{news_id}")
def retrieve_news_route(news_id: str):
    response = retrieve_news(news_id)
    if response["data"] is None:
        raise HTTPException(status_code=404, detail="News item not found.")
    return response


@router.post("")
def create_news_route(payload: NewsCreate):
    return create_news(payload)

