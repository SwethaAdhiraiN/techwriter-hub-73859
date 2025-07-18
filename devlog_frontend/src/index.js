import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Attach the Marked markdown library via CDN for markdown preview.
// If already loaded, do nothing.
if (typeof window !== "undefined" && !window.marked) {
  const script = document.createElement("script");
  script.src = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
  script.async = true;
  script.onload = () => {
    /* Enable any marked.js config if necessary here. */
  };
  document.body.appendChild(script);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
