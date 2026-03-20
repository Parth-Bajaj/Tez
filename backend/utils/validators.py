from fastapi import HTTPException


def validate_news_payload(title: str, content: str) -> None:
    if len(title.strip()) < 8:
        raise HTTPException(status_code=422, detail="Title must be at least 8 characters long.")
    if len(content.strip()) < 40:
        raise HTTPException(status_code=422, detail="Content must be at least 40 characters long.")

