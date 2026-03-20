import PredictionBadge from "../news/PredictionBadge";
import formatDate from "../../utils/formatDate";

export default function NewsTable({ items }) {
  return (
    <div className="table-card">
      <div className="table-header">
        <h3>Published stories</h3>
        <span>{items.length} items</span>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Source</th>
              <th>Prediction</th>
              <th>Published</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.source}</td>
                <td>
                  <PredictionBadge label={item.prediction} confidence={item.confidence} />
                </td>
                <td>{formatDate(item.publishedAt)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

