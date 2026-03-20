import { Link } from "react-router-dom";
import Button from "../common/Button";

export default function VerifyButton({ newsId, compact = false }) {
  return (
    <Link to={`/verify?newsId=${newsId}`}>
      <Button variant={compact ? "ghost" : "secondary"}>Verify Story</Button>
    </Link>
  );
}

