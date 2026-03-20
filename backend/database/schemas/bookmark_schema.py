from pydantic import BaseModel


class BookmarkCreate(BaseModel):
    userId: str
    newsId: str

