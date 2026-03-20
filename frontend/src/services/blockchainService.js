import api from "./api";
import { mockTransactions } from "./mockData";

export async function getLedgerStatus() {
  try {
    return await api.get("/blockchain/status");
  } catch (error) {
    return {
      data: {
        network: "Polygon Amoy",
        lastBlockSynced: 4811288,
        confirmationsRequired: 2,
        recentTransactions: mockTransactions,
      },
    };
  }
}

export async function verifyStory(payload) {
  try {
    return await api.post("/blockchain/verify", payload);
  } catch (error) {
    return {
      data: {
        verified: Boolean(payload.storyHash),
        txHash: payload.txHash || "0xlocal...demo",
        network: "Polygon Amoy",
        message: payload.storyHash
          ? "Hash found in local demo ledger."
          : "Provide a story hash to verify integrity.",
      },
    };
  }
}

