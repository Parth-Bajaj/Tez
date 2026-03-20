from services.blockchain_service import (
    get_blockchain_status,
    store_news_hash,
    verify_news_hash,
)
from utils.response_helper import success_response


def status():
    return success_response(get_blockchain_status(), "Ledger status fetched successfully.")


def store(payload):
    record = store_news_hash(
        payload.get("title", "Untitled"),
        payload.get("content", ""),
        payload.get("prediction", "unknown"),
        int(payload.get("credibilityScore", 0)),
    )
    return success_response(record, "Story hash stored successfully.")


def verify(payload):
    data = verify_news_hash(payload.get("storyHash", ""), payload.get("txHash"))
    return success_response(data, "Verification completed.")

