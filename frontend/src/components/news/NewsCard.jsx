import { Link } from "react-router-dom";
import SourceTag from "./SourceTag";
import CredibilityMeter from "./CredibilityMeter";
import PredictionBadge from "./PredictionBadge";
import VerifyButton from "./VerifyButton";
import Button from "../common/Button";
import formatDate from "../../utils/formatDate";
import truncateText from "../../utils/truncateText";
import hashPreview from "../../utils/hashPreview";

export default function NewsCard({ item, isSaved, onToggleSave, onOpenDetails }) {
  return (
    <article className="news-card reveal">
      <div className="news-card-image">
        <img src={item.image} alt={item.title} />
      </div>
      <div className="news-card-body">
        <div className="news-meta-row">
          <SourceTag source={item.source} />
          <PredictionBadge label={item.prediction} confidence={item.confidence} />
        </div>
        <h3>{item.title}</h3>
        <p>{truncateText(item.summary, 180)}</p>
        <CredibilityMeter score={item.credibilityScore} />
        <div className="news-inline-meta">
          <span>{item.category}</span>
          <span>{formatDate(item.publishedAt)}</span>
          <span>{hashPreview(item.storyHash)}</span>
        </div>
        <div className="news-card-actions">
          <Button variant="ghost" onClick={() => onOpenDetails?.(item)}>
            Quick View
          </Button>
          <VerifyButton newsId={item.id} compact />
          <Button variant={isSaved ? "secondary" : "ghost"} onClick={() => onToggleSave(item.id)}>
            {isSaved ? "Saved" : "Save"}
          </Button>
          <Link to={`/news/${item.id}`} className="text-link">
            Open Story
          </Link>
        </div>
      </div>
    </article>
  );
}

