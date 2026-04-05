import sys
import os

# Clean import path generation:
# ML model code inside `backend/ml_models/src` depends on `src.something` being in the python path.
ml_models_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../ml_models'))
if ml_models_path not in sys.path:
    # Prepend to path to ensure we hit the ml_models directory first
    sys.path.insert(0, ml_models_path)

# Now standard ML file imports succeed without modifying any code inside them!
from src.inference import server, predict

# We also ensure the Singleton server knows the exact absolute path to its required pickled items
absolute_model_dir = os.path.join(ml_models_path, 'model_pipeline')
server.model_dir = absolute_model_dir


def _build_explanation(label: str, important_words: list[str]) -> str:
    if not important_words:
        return (
            "The model relied on its overall language and context patterns to reach this result."
        )

    joined_keywords = ", ".join(important_words[:3])
    if label == "FAKE":
        return (
            f"This article leans FAKE because the language pattern around {joined_keywords} "
            "looks sensational or weakly grounded in verifiable evidence."
        )
    return (
        f"This article leans REAL because the language pattern around {joined_keywords} "
        "looks more consistent with grounded and verifiable reporting."
    )

def load_ml_models():
    """Trigger the singleton model loading to avoid cold starts."""
    server.load_models()

def get_prediction(text: str) -> dict:
    """Pass user text straight through the ML predictor"""
    try:
        if not text or len(text.strip()) == 0:
            return {"label": "FAKE", "confidence": 0.0, "error": "Text cannot be empty"}
            
        result = predict(text)
        result["important_words"] = result.get("important_words") or []
        result["explanation"] = _build_explanation(
            result.get("label", "UNKNOWN"),
            result["important_words"],
        )
        return result
    except Exception as e:
        return {"label": "ERROR", "confidence": 0.0, "error": str(e)}
