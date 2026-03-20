import PredictionBadge from "./PredictionBadge";
import SourceTag from "./SourceTag";
import CredibilityMeter from "./CredibilityMeter";
import formatDate from "../../utils/formatDate";
import hashPreview from "../../utils/hashPreview";

export default function NewsDetails({ item, compact = false }) {
  return (
    <article className={`story-panel ${compact ? "story-panel-compact" : ""}`}>
      <img className="story-hero" src={item.image} alt={item.title} />
      <div className="story-copy">
        <div className="news-meta-row">
          <SourceTag source={item.source} />
          <PredictionBadge label={item.prediction} confidence={item.confidence} />
        </div>
        <h1>{item.title}</h1>
        <p className="story-byline">
          {item.author} • {formatDate(item.publishedAt)}
        </p>
        <CredibilityMeter score={item.credibilityScore} />
        <p>{item.content}</p>
        <div className="detail-grid">
          <div>
            <span className="detail-label">Category</span>
            <strong>{item.category}</strong>
          </div>
          <div>
            <span className="detail-label">Transaction</span>
            <strong>{item.txHash}</strong>
          </div>
          <div>
            <span className="detail-label">Story hash</span>
            <strong>{hashPreview(item.storyHash)}</strong>
          </div>
        </div>
      </div>
    </article>
  );
}

