import React from "react";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

// PUBLIC_INTERFACE
function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle theme">
      {theme === "light" ? "🌙" : "☀️"}
      <span className="theme-toggle-text">{theme === "light" ? "Dark" : "Light"}</span>
    </button>
  );
}

export default ThemeToggle;
