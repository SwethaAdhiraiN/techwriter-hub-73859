import React from "react";
import "./LoadingSpinner.css";

// PUBLIC_INTERFACE
function LoadingSpinner() {
  return (
    <div className="loading-spinner__wrapper">
      <div className="loading-spinner"></div>
    </div>
  );
}

export default LoadingSpinner;
