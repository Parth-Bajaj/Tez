import pickle
from pathlib import Path


ARTIFACT_DIR = Path(__file__).resolve().parents[1] / "artifacts"


def predict(text: str):
    with (ARTIFACT_DIR / "vectorizer.pkl").open("rb") as vectorizer_file:
        vectorizer = pickle.load(vectorizer_file)
    with (ARTIFACT_DIR / "fake_news_model.pkl").open("rb") as model_file:
        model = pickle.load(model_file)

    vectorized = vectorizer.transform([text])
    prediction = model.predict(vectorized)[0]
    return prediction


if __name__ == "__main__":
    sample = "Editors published a transparent correction policy and linked every source."
    print(predict(sample))

