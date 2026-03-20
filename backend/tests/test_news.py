import sys
import unittest
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from database.db import db
from database.schemas.news_schema import NewsCreate
from services.news_service import create_news_article, get_all_news


class NewsServiceTests(unittest.TestCase):
    def setUp(self):
        db.reset()

    def test_seed_news_available(self):
        self.assertGreaterEqual(len(get_all_news()), 4)

    def test_create_news_article_generates_prediction_and_hash(self):
        article = create_news_article(
            NewsCreate(
                title="Editors publish a transparent correction log for election stories",
                content="A newsroom published a transparent correction log that tracks revision timestamps, source evidence, and verification notes for election-related reporting. Editors say the goal is to improve trust and reduce confusion during fast-moving events.",
                source="Open Press",
                category="Media",
            )
        )
        self.assertIn(article["prediction"], {"real", "fake"})
        self.assertTrue(article["storyHash"])


if __name__ == "__main__":
    unittest.main()

