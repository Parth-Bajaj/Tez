export default function BlockchainStatus({ status }) {
  if (!status) return null;

  return (
    <section className="panel blockchain-status">
      <div>
        <p className="eyebrow">Ledger Status</p>
        <h3>{status.network}</h3>
      </div>
      <div className="detail-grid">
        <div>
          <span className="detail-label">Last synced block</span>
          <strong>{status.lastBlockSynced}</strong>
        </div>
        <div>
          <span className="detail-label">Confirmations required</span>
          <strong>{status.confirmationsRequired}</strong>
        </div>
      </div>
    </section>
  );
}

