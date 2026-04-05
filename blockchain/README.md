# News Verification Blockchain Module

Minimal Hardhat project for storing fake-news verification proofs on-chain.

## Contract

- `contracts/NewsVerification.sol`
- Stores only a content hash, result label, confidence score, and timestamp
- Avoids loops and full-text storage for lower gas usage

## Setup

1. Install dependencies:
   `corepack pnpm install`
2. Configure environment variables in `.env`:
   - `PRIVATE_KEY`
   - `RPC_URL` or network-specific RPC URLs
3. Compile:
   `corepack pnpm compile`
4. Deploy:
   `corepack pnpm deploy:sepolia`
   or
   `corepack pnpm deploy:mumbai`

## Deployment Output

After deployment, the script writes:

- contract address
- ABI

to `deployments/<network>.json`.

## Backend Integration

The FastAPI backend reads:

- `RPC_URL`
- `PRIVATE_KEY`
- `CONTRACT_ADDRESS`

If those variables are missing, the backend falls back to a local development mock so the API remains usable before deployment.
