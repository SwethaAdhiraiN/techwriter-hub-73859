import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";

// PUBLIC_INTERFACE
function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <Link className="navbar-logo" to="/">DevLog</Link>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/editor">Write</Link>
        {user ? (
          <>
            <Link to={`/profile/${user.username}`}>Profile</Link>
            <button className="navbar-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Sign In</Link>
            <Link to="/register">Sign Up</Link>
          </>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}

export default Navbar;
