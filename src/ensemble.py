import numpy as np
import json

DEFAULT_WEIGHTS = {
    'distilbert': 0.5,
    'logistic': 0.2,
    'naive_bayes': 0.1,
    'random_forest': 0.1,
    'lstm': 0.1
}

def predict_ensemble(predictions: dict, weights: dict = None) -> float:
    """
    Combines independent probability predictions using weighted averaging.
    Expects predictions to be the probability of the text being REAL (class 1).
    
    predictions: dict of {model_name: probability_of_class_1}
    weights: dict of {model_name: weight}
    """
    if weights is None:
        weights = DEFAULT_WEIGHTS
        
    weighted_sum = 0.0
    total_weight = 0.0
    
    for model_name, prob in predictions.items():
        if model_name in weights:
            weight = weights[model_name]
            weighted_sum += prob * weight
            total_weight += weight
            
    if total_weight == 0:
        raise ValueError("No matching models found in weights configuration.")
        
    return weighted_sum / total_weight

def get_label_str(probability: float, threshold: float = 0.5) -> str:
    """Converts a probability representing REAL class into a FAKE/REAL string."""
    return "REAL" if probability >= threshold else "FAKE"

def save_ensemble_config(filepath: str, weights: dict = None):
    if weights is None:
        weights = DEFAULT_WEIGHTS
    with open(filepath, 'w') as f:
        json.dump(weights, f, indent=4)
        
def load_ensemble_config(filepath: str) -> dict:
    with open(filepath, 'r') as f:
        return json.load(f)
