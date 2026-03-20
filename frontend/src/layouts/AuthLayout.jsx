import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="auth-layout">
      <section className="auth-panel reveal">
        <div className="auth-brand">
          <p className="eyebrow">Tez Access</p>
          <h1>Sign in to save, verify, and report stories in real time.</h1>
        </div>
        <Outlet />
      </section>
    </div>
  );
}
