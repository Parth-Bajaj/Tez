from database.models.news_model import NewsModel
from database.models.user_model import UserModel
from utils.hash_utils import build_tx_hash, sha256_text


def seed_users():
    return [
        UserModel(
            id="admin-1",
            name="Admin User",
            email="admin@tez.app",
            password="demo123",
            role="admin",
        ),
        UserModel(
            id="reader-1",
            name="Reader One",
            email="reader@tez.app",
            password="demo123",
            role="reader",
        ),
    ]


def seed_news():
    raw_news = [
        {
            "id": "n1",
            "title": "City launches public dashboard to track fact-checked civic updates",
            "summary": "A new transparency dashboard publishes source links, claim status, and public corrections in a compact mobile format.",
            "content": "The municipal innovation office launched a public dashboard that lets residents read verified civic updates in a short-form card layout. Each entry includes source links, a fact-check status, and a correction history to improve trust in official communication.",
            "category": "Governance",
            "source": "Civic Ledger",
            "published_at": "2026-03-12T10:30:00Z",
            "author": "Aarav Sen",
            "image": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
            "credibility_score": 92,
            "prediction": "real",
            "confidence": 0.91,
        },
        {
            "id": "n2",
            "title": "Viral post claims scientists found a pill that ends sleep permanently",
            "summary": "Experts say the headline is misleading and the underlying study only examined temporary alertness markers in a lab setting.",
            "content": "A viral social post exaggerated preliminary research into fatigue management and falsely described it as a permanent replacement for sleep. Researchers quoted in the report clarified that the experiment focused on short-term alertness changes and does not support the claim made online.",
            "category": "Science",
            "source": "Signal Watch",
            "published_at": "2026-03-11T16:00:00Z",
            "author": "Mira Thomas",
            "image": "https://images.unsplash.com/photo-1532187643603-ba119ca4109e?auto=format&fit=crop&w=1200&q=80",
            "credibility_score": 33,
            "prediction": "fake",
            "confidence": 0.82,
        },
        {
            "id": "n3",
            "title": "Independent newsroom opens its article revision history to readers",
            "summary": "Readers can now compare article edits, timestamps, and verification notes before sharing breaking stories.",
            "content": "An independent newsroom has added revision history to every article, allowing readers to compare changes over time. Editors say the move is intended to reduce confusion when breaking stories evolve quickly and to show how verification decisions were made.",
            "category": "Media",
            "source": "Open Press",
            "published_at": "2026-03-10T08:45:00Z",
            "author": "Ishita Roy",
            "image": "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80",
            "credibility_score": 88,
            "prediction": "real",
            "confidence": 0.87,
        },
        {
            "id": "n4",
            "title": "Forwarded message says all digital payments will be frozen this weekend",
            "summary": "Banks and regulators have not issued such a notice, and several fact-check desks marked the message as fabricated.",
            "content": "A widely forwarded message warned of a nationwide freeze on digital payments over the weekend. No bank or regulator published any such advisory, and multiple verification desks traced the message to recycled panic posts that appear during festival seasons and system maintenance rumours.",
            "category": "Finance",
            "source": "Claim Check",
            "published_at": "2026-03-09T13:20:00Z",
            "author": "Dev Malhotra",
            "image": "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
            "credibility_score": 26,
            "prediction": "fake",
            "confidence": 0.89,
        },
    ]

    items = []
    for entry in raw_news:
        story_hash = sha256_text(entry["content"])
        items.append(
            NewsModel(
                **entry,
                story_hash=story_hash,
                tx_hash=build_tx_hash(f"{entry['id']}:{story_hash}"),
            )
        )
    return items
