import csv
import pickle
from pathlib import Path

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split

from feature_engineering import build_vectorizer


ROOT = Path(__file__).resolve().parents[1]
DATA_PATH = ROOT / "data" / "processed" / "cleaned_news.csv"
ARTIFACT_DIR = ROOT / "artifacts"


def load_rows():
    with DATA_PATH.open(newline="", encoding="utf-8") as csv_file:
        return list(csv.DictReader(csv_file))


def train():
    rows = load_rows()
    texts = [row["text"] for row in rows]
    labels = [row["label"] for row in rows]

    x_train, x_test, y_train, y_test = train_test_split(
        texts, labels, test_size=0.2, random_state=42, stratify=labels
    )

    vectorizer = build_vectorizer()
    x_train_vectorized = vectorizer.fit_transform(x_train)

    model = LogisticRegression(max_iter=1000)
    model.fit(x_train_vectorized, y_train)

    ARTIFACT_DIR.mkdir(parents=True, exist_ok=True)
    with (ARTIFACT_DIR / "vectorizer.pkl").open("wb") as vectorizer_file:
        pickle.dump(vectorizer, vectorizer_file)
    with (ARTIFACT_DIR / "fake_news_model.pkl").open("wb") as model_file:
        pickle.dump(model, model_file)

    return model, vectorizer, x_test, y_test


if __name__ == "__main__":
    train()

