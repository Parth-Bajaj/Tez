# Fake News Detection - FastAPI Backend

This is the production-ready backend connecting the advanced ML Pipeline with REST API Endpoints. It incorporates predictive machine learning interfaces, early-stage blockchain configuration services, and JWT authentication structures. 

## Run the API
1. Install requirements:
`pip install -r requirements.txt`
2. Start the Uvicorn Server:
`uvicorn app.main:app --reload`
3. Access API docs at `http://localhost:8000/docs`.

## Integration Capabilities
- `/predict` calculates contextual models on text parameters for FAKE vs REAL responses.
- Models are initialized via the Singleton sequence during FastAPI startup (zero-cost on user hit).
