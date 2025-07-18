import React from "react";
import "./Footer.css";

// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>© {new Date().getFullYear()} DevLog. Made for developers.</span>
        <span className="footer-powered">Powered by React</span>
      </div>
    </footer>
  );
}

export default Footer;
