from typing import Optional

from services.news_service import create_news_article, get_all_news, get_news_by_id
from utils.response_helper import success_response


def list_news(category: Optional[str] = None):
    return success_response(get_all_news(category), "News fetched successfully.")


def retrieve_news(news_id: str):
    item = get_news_by_id(news_id)
    return success_response(item, "News item fetched successfully.")


def create_news(payload):
    return success_response(create_news_article(payload), "News published successfully.")
