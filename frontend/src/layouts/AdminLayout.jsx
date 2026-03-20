import { NavLink, Outlet } from "react-router-dom";

export default function AdminLayout() {
  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <p className="eyebrow">Editorial Control</p>
        <h2>Tez Admin</h2>
        <nav className="admin-nav">
          <NavLink to="/admin">Dashboard</NavLink>
          <NavLink to="/verify">Verification</NavLink>
          <NavLink to="/report">Reports</NavLink>
        </nav>
      </aside>
      <section className="admin-content">
        <Outlet />
      </section>
    </div>
  );
}
