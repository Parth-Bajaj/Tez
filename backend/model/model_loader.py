import pickle
from pathlib import Path
from typing import Dict


MODEL_DIR = Path(__file__).resolve().parent
MODEL_PATH = MODEL_DIR / "fake_news_model.pkl"
VECTORIZER_PATH = MODEL_DIR / "vectorizer.pkl"


class DemoModelLoader:
    def __init__(self) -> None:
        self.model = None
        self.vectorizer = None
        self._load()

    def _load(self) -> None:
        try:
            if MODEL_PATH.exists() and VECTORIZER_PATH.exists():
                with MODEL_PATH.open("rb") as model_file:
                    self.model = pickle.load(model_file)
                with VECTORIZER_PATH.open("rb") as vectorizer_file:
                    self.vectorizer = pickle.load(vectorizer_file)
        except Exception:
            self.model = None
            self.vectorizer = None

    def predict(self, text: str) -> Dict[str, float]:
        if self.model and self.vectorizer:
            vector = self.vectorizer.transform([text])
            prediction = self.model.predict(vector)[0]
            if hasattr(self.model, "predict_proba"):
                probability = float(max(self.model.predict_proba(vector)[0]))
            else:
                probability = 0.75
            return {"label": str(prediction), "confidence": probability}
        return {"label": "real", "confidence": 0.5}


model_loader = DemoModelLoader()

