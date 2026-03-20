from utils.summarizer import summarize_text


def generate_summary(content: str) -> str:
    return summarize_text(content, word_limit=36)

