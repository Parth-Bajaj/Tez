# Tez

Tez is a full-stack starter for a short-form news platform that combines:

- AI-assisted fake news detection
- Blockchain-style hash verification
- Swipe-friendly news consumption
- Admin moderation and reporting workflows

The repo is structured as a monorepo with:

- `frontend/` for the React + Vite UI
- `backend/` for the FastAPI API
- `ml/` for the news-classification pipeline
- `blockchain/` for the smart contract layer
- `database/` and `dataset/` for design assets and sample data
- `docs/` for project documentation

This scaffold is intentionally ready for extension:

- The frontend already includes the complete route and component structure.
- The backend exposes real endpoints with demo in-memory persistence.
- The prediction and blockchain flows are implemented as starter services that can later be replaced by trained models and deployed contracts.

## Quick start

### Backend

1. Create a Python virtual environment.
2. Install dependencies from `backend/requirements.txt`.
3. Run `uvicorn app:app --reload` from `backend/`.

### Frontend

1. Install dependencies from `frontend/package.json`.
2. Run `npm run dev` from `frontend/`.

## Notes

- The current build uses local demo data and a heuristic prediction engine so the project works before the ML model is trained.
- The blockchain flow currently writes a tamper-proof style ledger entry in the backend; the Solidity contract and Hardhat files are scaffolded for later on-chain deployment.
