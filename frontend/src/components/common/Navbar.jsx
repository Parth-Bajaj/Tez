import { NavLink } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

export default function Navbar() {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="navbar">
      <NavLink to="/" className="brandmark">
        <img src="/logo.svg" alt="Tez" />
      </NavLink>
      <nav className="navbar-links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/explore">Explore</NavLink>
        <NavLink to="/verify">Verify</NavLink>
        <NavLink to="/report">Report</NavLink>
        {isAuthenticated && <NavLink to="/saved">Saved</NavLink>}
        {isAdmin && <NavLink to="/admin">Admin</NavLink>}
      </nav>
      <div className="navbar-actions">
        <button type="button" className="theme-toggle" onClick={toggleTheme}>
          {theme === "sunrise" ? "Midnight Mode" : "Sunrise Mode"}
        </button>
        {isAuthenticated ? (
          <>
            <NavLink to="/profile" className="text-link">
              Profile
            </NavLink>
            <button type="button" className="text-link" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <NavLink to="/auth/login" className="text-link">
            Login
          </NavLink>
        )}
      </div>
    </header>
  );
}
