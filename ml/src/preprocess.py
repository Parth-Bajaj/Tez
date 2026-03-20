import csv
import re
from pathlib import Path


ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = ROOT / "dataset" / "raw"
PROCESSED_DIR = ROOT / "ml" / "data" / "processed"
OUTPUT_PATH = PROCESSED_DIR / "cleaned_news.csv"


def clean_text(text: str) -> str:
    text = text or ""
    text = re.sub(r"http\S+", " ", text)
    text = re.sub(r"[^a-zA-Z0-9\s]", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip().lower()


def _read_csv(path: Path, label: str):
    with path.open(newline="", encoding="utf-8") as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            yield {
                "title": row.get("title", ""),
                "text": clean_text(row.get("text", "")),
                "label": label,
            }


def preprocess():
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    rows = []
    rows.extend(list(_read_csv(RAW_DIR / "True.csv", "real")))
    rows.extend(list(_read_csv(RAW_DIR / "Fake.csv", "fake")))

    with OUTPUT_PATH.open("w", newline="", encoding="utf-8") as csv_file:
        writer = csv.DictWriter(csv_file, fieldnames=["title", "text", "label"])
        writer.writeheader()
        writer.writerows(rows)

    print(f"Saved cleaned dataset to {OUTPUT_PATH}")


if __name__ == "__main__":
    preprocess()
