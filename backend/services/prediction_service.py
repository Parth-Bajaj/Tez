from model.model_loader import model_loader
from utils.constants import PANIC_TERMS, SUSPICIOUS_TERMS, TRUSTED_SOURCES
from utils.text_cleaner import clean_text


def predict_article(title: str, content: str, source: str = ""):
    clean_title = clean_text(title)
    clean_content = clean_text(content)
    source_name = clean_text(source)
    combined = f"{clean_title} {clean_content}".strip()

    suspicious_hits = sum(term in combined for term in SUSPICIOUS_TERMS)
    panic_hits = sum(term in combined for term in PANIC_TERMS)
    trust_bonus = 2 if source_name in TRUSTED_SOURCES else 0
    caps_penalty = 1 if title.isupper() else 0

    score = 70 + (trust_bonus * 8) - (suspicious_hits * 14) - (panic_hits * 10) - (caps_penalty * 6)
    score = max(5, min(95, score))

    baseline = model_loader.predict(combined)
    if baseline["label"].lower() == "fake":
        score = min(score, 45)

    label = "real" if score >= 60 else "fake"
    confidence = round(0.55 + abs(score - 50) / 100, 2)

    reasons = []
    if source_name in TRUSTED_SOURCES:
        reasons.append("Source is in the trusted source list.")
    if suspicious_hits:
        reasons.append("Sensational or rumor-style keywords were detected.")
    if panic_hits:
        reasons.append("Urgency language suggests manipulative framing.")
    if not reasons:
        reasons.append("Article language is relatively neutral and source-backed.")

    return {
        "label": label,
        "confidence": confidence,
        "credibilityScore": score,
        "reasons": reasons,
    }

