import hashlib


def sha256_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8")).hexdigest()


def build_tx_hash(value: str) -> str:
    return f"0x{sha256_text(value)[:24]}"

