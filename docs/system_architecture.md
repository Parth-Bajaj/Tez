# System Architecture

## High-level flow

1. Admin uploads a story.
2. Backend cleans text and runs a fake-news prediction.
3. Backend computes a SHA-256 story hash.
4. Verification metadata is stored in a ledger record.
5. Frontend shows summary, score, prediction, and verification status.
6. Users can report or save stories and re-check the hash later.

## Layers

- `frontend/`: presentation and user interaction
- `backend/routes`: API surface
- `backend/controllers`: request orchestration
- `backend/services`: business rules
- `backend/database`: in-memory demo store and schema design
- `ml/`: training and artifact generation
- `blockchain/`: smart contract and deployment scripts

