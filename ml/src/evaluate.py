import json
from pathlib import Path

from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score

from train import train


ARTIFACT_DIR = Path(__file__).resolve().parents[1] / "artifacts"


def evaluate():
    model, vectorizer, x_test, y_test = train()
    predictions = model.predict(vectorizer.transform(x_test))
    metrics = {
        "accuracy": round(float(accuracy_score(y_test, predictions)), 4),
        "precision": round(float(precision_score(y_test, predictions, pos_label="real")), 4),
        "recall": round(float(recall_score(y_test, predictions, pos_label="real")), 4),
        "f1": round(float(f1_score(y_test, predictions, pos_label="real")), 4),
    }
    with (ARTIFACT_DIR / "metrics.json").open("w", encoding="utf-8") as metrics_file:
        json.dump(metrics, metrics_file, indent=2)
    print(metrics)


if __name__ == "__main__":
    evaluate()

