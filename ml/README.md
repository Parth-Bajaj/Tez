# Tez ML Pipeline

This folder contains the fake news detection training workflow.

## Flow

1. Put source datasets in `../dataset/raw/` or `ml/data/raw/`.
2. Run `src/preprocess.py` to clean and label the dataset.
3. Run `src/train.py` to train a baseline TF-IDF + Logistic Regression classifier.
4. Run `src/evaluate.py` to generate metrics in `artifacts/metrics.json`.
5. Run `src/save_artifacts.py` to copy the trained model into `../backend/model/`.

## Current state

- The backend already works with a heuristic fallback.
- Once real artifacts are trained, the API will start using them automatically.
