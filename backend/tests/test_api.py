from fastapi.testclient import TestClient

import app.api.routes as api_routes
import app.main as app_main
from app.main import app
from app.services.analytics_service import analytics_service
from app.services.user_service import user_store


def _mock_load_ml_models() -> None:
    return None


def _mock_prediction(text: str) -> dict:
    if not text.strip():
        return {"label": "FAKE", "confidence": 0.0, "error": "Text cannot be empty"}

    return {
        "label": "REAL",
        "confidence": 0.91,
        "model_breakdown": {
            "logistic": "REAL",
            "naive_bayes": "REAL",
            "random_forest": "FAKE",
            "lstm": "REAL",
            "distilbert": "REAL",
        },
        "important_words": ["government", "policy", "taxes"],
        "explanation": "This article leans REAL because the language looks grounded.",
    }


def _mock_store_result(text_hash: str, result: str, confidence: float) -> dict:
    return {
        "txHash": "0x1234567890abcdef1234567890abcdef12345678",
        "blockNumber": 101,
    }


def _mock_get_result(text_hash: str) -> dict | None:
    if text_hash != "known-hash":
        return None
    return {
        "contentHash": text_hash,
        "result": "FAKE",
        "confidence": 9200,
        "timestamp": 1710000000,
        "txHash": "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
        "blockNumber": 222,
    }


def setup_module() -> None:
    app_main.load_ml_models = _mock_load_ml_models
    api_routes.get_prediction = _mock_prediction
    api_routes.store_result = _mock_store_result
    api_routes.get_result = _mock_get_result


def setup_function() -> None:
    user_store._users.clear()
    analytics_service._records.clear()


def test_health_endpoint():
    with TestClient(app) as client:
        response = client.get("/health")

    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_predict_endpoint_returns_model_output():
    app.dependency_overrides.clear()
    with TestClient(app) as client:
        response = client.post("/predict", json={"text": "A test article"})

    assert response.status_code == 200
    body = response.json()
    assert body["label"] == "REAL"
    assert body["confidence"] == 0.91
    assert "model_breakdown" in body
    assert "explanation" in body


def test_signup_login_and_protected_predict_and_store():
    with TestClient(app) as client:
        signup_response = client.post(
            "/auth/signup",
            json={"username": "reporter1", "password": "secret123", "role": "reporter"},
        )
        assert signup_response.status_code == 200
        token = signup_response.json()["access_token"]

        login_response = client.post(
            "/auth/login",
            json={"username": "reporter1", "password": "secret123"},
        )
        assert login_response.status_code == 200

        profile_response = client.get(
            "/profile",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert profile_response.status_code == 200
        assert profile_response.json()["username"] == "reporter1"

        analytics_response = client.get(
            "/analytics",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert analytics_response.status_code == 200
        assert analytics_response.json()["total_checked"] >= 0

        protected_response = client.post(
            "/predict-and-store",
            json={"text": "A protected prediction call"},
            headers={"Authorization": f"Bearer {token}"},
        )

    assert protected_response.status_code == 200
    body = protected_response.json()
    assert body["hash"]
    assert body["txHash"].startswith("0x")
    assert body["blockNumber"] == 101
    assert body["label"] == "REAL"


def test_verify_endpoint_returns_blockchain_record():
    with TestClient(app) as client:
        response = client.get("/verify/known-hash")

    assert response.status_code == 200
    body = response.json()
    assert body["result"] == "FAKE"
    assert body["txHash"].startswith("0x")


def test_analytics_endpoint_counts_predictions():
    with TestClient(app) as client:
        signup_response = client.post(
            "/auth/signup",
            json={"username": "analyst", "password": "secret123", "role": "user"},
        )
        token = signup_response.json()["access_token"]

        client.post("/predict", json={"text": "Story one"})
        client.post(
            "/predict-and-store",
            json={"text": "Story two"},
            headers={"Authorization": f"Bearer {token}"},
        )
        response = client.get(
            "/analytics",
            headers={"Authorization": f"Bearer {token}"},
        )

    assert response.status_code == 200
    body = response.json()
    assert body["total_checked"] == 2
    assert "government" in body["top_keywords"]


def test_protected_route_rejects_missing_token():
    with TestClient(app) as client:
        response = client.post("/predict-and-store", json={"text": "Unauthorized"})

    assert response.status_code == 401
