import React from "react";
import { Heart } from "lucide-react";
import "./Footer.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <p className="footer-text">
            © {currentYear} Gowtham. All rights reserved.
          </p>
          <p className="footer-made">
            Made with <Heart size={16} className="heart-icon" fill="#0ea5e9" stroke="#0ea5e9" /> by Gowtham
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
