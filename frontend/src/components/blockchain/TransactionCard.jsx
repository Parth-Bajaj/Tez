import hashPreview from "../../utils/hashPreview";
import formatDate from "../../utils/formatDate";

export default function TransactionCard({ transaction }) {
  return (
    <article className="transaction-card">
      <div>
        <p className="eyebrow">Ledger entry</p>
        <h4>{transaction.title}</h4>
      </div>
      <p>{hashPreview(transaction.txHash)}</p>
      <p>{hashPreview(transaction.storyHash)}</p>
      <span>{formatDate(transaction.timestamp)}</span>
    </article>
  );
}

