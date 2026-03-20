import { useEffect, useState } from "react";
import { getLedgerStatus, verifyStory } from "../services/blockchainService";

export default function useBlockchain() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function load() {
      const response = await getLedgerStatus();
      if (active) {
        setStatus(response.data);
        setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  return {
    status,
    loading,
    verifyStory,
  };
}

