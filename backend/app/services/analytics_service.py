from collections import Counter


class AnalyticsService:
    def __init__(self) -> None:
        self._records: list[dict] = []

    def record_prediction(self, result: dict) -> None:
        important_words = result.get("important_words") or []
        self._records.append(
            {
                "label": result.get("label", "UNKNOWN"),
                "important_words": important_words,
            }
        )

    def get_summary(self) -> dict:
        total_checked = len(self._records)
        fake_count = sum(1 for record in self._records if record["label"] == "FAKE")
        real_count = sum(1 for record in self._records if record["label"] == "REAL")
        fake_percentage = round((fake_count / total_checked) * 100, 2) if total_checked else 0

        keyword_counter = Counter()
        for record in self._records:
            keyword_counter.update(record["important_words"])

        return {
            "total_checked": total_checked,
            "fake_count": fake_count,
            "real_count": real_count,
            "fake_percentage": fake_percentage,
            "top_keywords": [keyword for keyword, _ in keyword_counter.most_common(5)],
        }


analytics_service = AnalyticsService()
