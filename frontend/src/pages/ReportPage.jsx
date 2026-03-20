import { useContext, useState } from "react";
import { NewsContext } from "../context/NewsContext";
import Button from "../components/common/Button";

export default function ReportPage() {
  const { fileReport } = useContext(NewsContext);
  const [form, setForm] = useState({ newsId: "", reason: "", notes: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await fileReport(form);
    setStatus("Report submitted for editorial review.");
    setForm({ newsId: "", reason: "", notes: "" });
  };

  return (
    <section className="panel report-panel">
      <p className="eyebrow">Community moderation</p>
      <h1>Report suspicious or misleading news</h1>
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          News ID
          <input value={form.newsId} onChange={(event) => setForm({ ...form, newsId: event.target.value })} />
        </label>
        <label>
          Reason
          <input value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} required />
        </label>
        <label>
          Notes
          <textarea value={form.notes} onChange={(event) => setForm({ ...form, notes: event.target.value })} rows="5" />
        </label>
        <Button type="submit">Submit report</Button>
      </form>
      {status && <p className="helper-text">{status}</p>}
    </section>
  );
}

