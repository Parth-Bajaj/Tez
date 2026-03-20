import useAuth from "../hooks/useAuth";

export default function Profile() {
  const { user } = useAuth();

  return (
    <section className="panel profile-panel">
      <p className="eyebrow">Profile</p>
      <h1>{user?.name}</h1>
      <div className="detail-grid">
        <div>
          <span className="detail-label">Email</span>
          <strong>{user?.email}</strong>
        </div>
        <div>
          <span className="detail-label">Role</span>
          <strong>{user?.role}</strong>
        </div>
      </div>
    </section>
  );
}

