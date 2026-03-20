from dataclasses import dataclass


@dataclass
class BookmarkModel:
    user_id: str
    news_id: str

