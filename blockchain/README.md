# Tez Blockchain Layer

This folder contains the smart contract scaffold for tamper-proof verification.

## Contract responsibilities

- Store the SHA-256 hash of an article
- Save the model prediction and credibility score
- Allow anyone to verify if a news hash already exists on-chain

## Suggested flow

1. Run a local Hardhat node or point to a testnet RPC.
2. Deploy `NewsVerify.sol`.
3. Call `storeNewsHash.js` after the backend predicts a story.
4. Use `verifyNewsHash.js` when a reader requests verification.
