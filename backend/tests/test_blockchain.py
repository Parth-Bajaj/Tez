import sys
import unittest
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from database.db import db
from services.blockchain_service import get_blockchain_status, verify_news_hash


class BlockchainServiceTests(unittest.TestCase):
    def setUp(self):
        db.reset()

    def test_status_includes_transactions(self):
        status = get_blockchain_status()
        self.assertGreaterEqual(len(status["recentTransactions"]), 4)

    def test_verify_seed_hash(self):
        first_item = next(iter(db.blockchain_entries.values()))
        result = verify_news_hash(first_item["storyHash"], first_item["txHash"])
        self.assertTrue(result["verified"])


if __name__ == "__main__":
    unittest.main()

