export default function HashVerificationResult({ result }) {
  if (!result) return null;

  return (
    <div className={`verification-result ${result.verified ? "verified" : "failed"}`}>
      <strong>{result.verified ? "Integrity verified" : "Hash not found"}</strong>
      <p>{result.message}</p>
      {result.txHash && <span>{result.txHash}</span>}
    </div>
  );
}

