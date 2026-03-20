import { useState } from "react";
import Button from "../common/Button";
import { predictArticle } from "../../services/predictionService";

export default function NewsUploadForm({ onCreate }) {
  const [form, setForm] = useState({
    title: "",
    summary: "",
    content: "",
    source: "",
    category: "General",
    image: "/news-default.svg",
    author: "Editorial Desk",
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("Analyzing article...");
    const prediction = await predictArticle(form);
    await onCreate({
      ...form,
      prediction: prediction.data.label,
      confidence: prediction.data.confidence,
      credibilityScore: prediction.data.credibilityScore,
      publishedAt: new Date().toISOString(),
      txHash: "pending-ledger-write",
      storyHash: "generated-on-server",
    });
    setStatus("Article added to the feed.");
    setForm({
      ...form,
      title: "",
      summary: "",
      content: "",
      source: "",
    });
  };

  return (
    <form className="admin-form" onSubmit={handleSubmit}>
      <div className="form-grid">
        <label>
          Title
          <input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
        </label>
        <label>
          Source
          <input value={form.source} onChange={(event) => setForm({ ...form, source: event.target.value })} required />
        </label>
      </div>
      <label>
        Summary
        <textarea value={form.summary} onChange={(event) => setForm({ ...form, summary: event.target.value })} required />
      </label>
      <label>
        Content
        <textarea
          rows="6"
          value={form.content}
          onChange={(event) => setForm({ ...form, content: event.target.value })}
          required
        />
      </label>
      <div className="form-grid">
        <label>
          Category
          <input value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })} />
        </label>
        <label>
          Image URL
          <input value={form.image} onChange={(event) => setForm({ ...form, image: event.target.value })} />
        </label>
      </div>
      <Button type="submit">Analyze & Publish</Button>
      {status && <p className="helper-text">{status}</p>}
    </form>
  );
}
