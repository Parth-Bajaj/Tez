import sys
import unittest
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))

from services.prediction_service import predict_article


class PredictionServiceTests(unittest.TestCase):
    def test_detects_suspicious_language(self):
        prediction = predict_article(
            "SHOCKING VIRAL SECRET UPDATE",
            "A forwarded viral message says a miracle payment freeze is guaranteed this weekend.",
            "Unknown Feed",
        )
        self.assertEqual(prediction["label"], "fake")

    def test_rewards_trusted_source(self):
        prediction = predict_article(
            "Public editor shares correction policy",
            "An independent newsroom documented how claims are verified and corrected in a public dashboard.",
            "Open Press",
        )
        self.assertEqual(prediction["label"], "real")


if __name__ == "__main__":
    unittest.main()

