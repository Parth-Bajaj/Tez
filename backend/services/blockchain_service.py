from datetime import datetime
from typing import Optional

from database.db import db
from utils.hash_utils import build_tx_hash, sha256_text


def store_news_hash(title: str, content: str, prediction: str, credibility_score: int):
    story_hash = sha256_text(content)
    existing = db.blockchain_entries.get(story_hash)
    if existing:
        return existing

    tx_hash = build_tx_hash(f"{title}:{story_hash}:{datetime.utcnow().isoformat()}")
    db.last_block_synced += 1
    record = {
        "id": f"tx-{len(db.blockchain_entries) + 1}",
        "title": title,
        "txHash": tx_hash,
        "storyHash": story_hash,
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "network": db.network,
        "status": f"confirmed:{prediction}:{credibility_score}",
    }
    db.blockchain_entries[story_hash] = record
    return record


def verify_news_hash(story_hash: str, tx_hash: Optional[str] = None):
    entry = db.blockchain_entries.get(story_hash)
    verified = bool(entry) and (tx_hash is None or entry["txHash"] == tx_hash)
    return {
        "verified": verified,
        "txHash": entry["txHash"] if entry else tx_hash,
        "network": db.network,
        "message": "Hash found and matched successfully."
        if verified
        else "No matching ledger entry was found for the provided hash.",
    }


def get_blockchain_status():
    recent_transactions = sorted(
        db.blockchain_entries.values(),
        key=lambda item: item["timestamp"],
        reverse=True,
    )[:6]
    return {
        "network": db.network,
        "lastBlockSynced": db.last_block_synced,
        "confirmationsRequired": db.confirmations_required,
        "recentTransactions": recent_transactions,
    }
