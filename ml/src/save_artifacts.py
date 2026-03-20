from pathlib import Path
from shutil import copy2


ROOT = Path(__file__).resolve().parents[2]
ML_ARTIFACTS = ROOT / "ml" / "artifacts"
BACKEND_MODEL = ROOT / "backend" / "model"


def save_artifacts():
    BACKEND_MODEL.mkdir(parents=True, exist_ok=True)
    for name in ["vectorizer.pkl", "fake_news_model.pkl"]:
        source = ML_ARTIFACTS / name
        if source.exists():
            copy2(source, BACKEND_MODEL / name)
            print(f"Copied {name} to backend/model")


if __name__ == "__main__":
    save_artifacts()
