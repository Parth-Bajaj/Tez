import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import useBlockchain from "../hooks/useBlockchain";
import BlockchainStatus from "../components/blockchain/BlockchainStatus";
import TransactionCard from "../components/blockchain/TransactionCard";
import HashVerificationResult from "../components/blockchain/HashVerificationResult";
import Button from "../components/common/Button";

export default function VerifyPage() {
  const [params] = useSearchParams();
  const { news } = useContext(NewsContext);
  const { status, verifyStory } = useBlockchain();
  const selectedId = params.get("newsId");
  const selectedStory = news.find((item) => item.id === selectedId);
  const [form, setForm] = useState({
    storyHash: selectedStory?.storyHash || "",
    txHash: selectedStory?.txHash || "",
  });
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (selectedStory) {
      setForm({
        storyHash: selectedStory.storyHash,
        txHash: selectedStory.txHash,
      });
    }
  }, [selectedStory]);

  const handleVerify = async (event) => {
    event.preventDefault();
    const response = await verifyStory(form);
    setResult(response.data);
  };

  return (
    <div className="verify-page">
      <section className="section-header">
        <div>
          <p className="eyebrow">Verification Desk</p>
          <h1>Check whether a story hash matches the ledger entry.</h1>
        </div>
      </section>

      <div className="verify-grid">
        <form className="panel verify-form" onSubmit={handleVerify}>
          <label>
            Story hash
            <input
              value={form.storyHash}
              onChange={(event) => setForm({ ...form, storyHash: event.target.value })}
              placeholder="Enter SHA-256 story hash"
            />
          </label>
          <label>
            Transaction hash
            <input
              value={form.txHash}
              onChange={(event) => setForm({ ...form, txHash: event.target.value })}
              placeholder="Optional transaction reference"
            />
          </label>
          <Button type="submit">Verify Integrity</Button>
          <HashVerificationResult result={result} />
        </form>

        <div className="stack-column">
          <BlockchainStatus status={status} />
          <section className="panel">
            <h3>Recent on-chain style entries</h3>
            <div className="transaction-grid">
              {status?.recentTransactions?.map((transaction) => (
                <TransactionCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
