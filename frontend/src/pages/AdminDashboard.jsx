import { useContext } from "react";
import { NewsContext } from "../context/NewsContext";
import AdminStats from "../components/admin/AdminStats";
import NewsUploadForm from "../components/admin/NewsUploadForm";
import NewsTable from "../components/admin/NewsTable";
import ReportedNewsList from "../components/admin/ReportedNewsList";

export default function AdminDashboard() {
  const { news, addNews } = useContext(NewsContext);

  return (
    <div className="admin-dashboard">
      <AdminStats items={news} />
      <div className="admin-dashboard-grid">
        <section className="panel">
          <p className="eyebrow">Publish</p>
          <h2>Analyze and publish a story</h2>
          <NewsUploadForm onCreate={addNews} />
        </section>
        <ReportedNewsList />
      </div>
      <NewsTable items={news} />
    </div>
  );
}

