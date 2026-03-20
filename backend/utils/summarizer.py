def summarize_text(text: str, word_limit: int = 60) -> str:
    words = (text or "").split()
    if len(words) <= word_limit:
        return " ".join(words)
    return f"{' '.join(words[:word_limit]).strip()}..."

