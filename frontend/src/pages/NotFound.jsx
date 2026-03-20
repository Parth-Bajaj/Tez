import { Link } from "react-router-dom";
import Button from "../components/common/Button";

export default function NotFound() {
  return (
    <section className="not-found">
      <p className="eyebrow">404</p>
      <h1>The story you are looking for is not in this feed.</h1>
      <Link to="/">
        <Button>Return home</Button>
      </Link>
    </section>
  );
}

