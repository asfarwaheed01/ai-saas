import React, { useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MdSupportAgent } from "react-icons/md";
import { FiPhone, FiMail, FiX } from "react-icons/fi";
import "./FloatingButtonSuppport.css";

const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const popupRef = useRef(null);

  // ✅ Always call hooks first (never conditionally)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // ✅ Now safely hide on dashboard routes
  if (location.pathname.startsWith("/dashboard")) {
    return null;
  }

  return (
    <>
      {/* Floating Button */}
      <div
        className={`floating-button ${isOpen ? "active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <MdSupportAgent size={32} />
      </div>

      {/* Popup */}
      <div ref={popupRef} className={`contact-popup ${isOpen ? "show" : ""}`}>
        <div className="popups-header">
          <b>Need Help?</b>
          {/* <p></p> */}
          <FiX className="close-icon" onClick={() => setIsOpen(false)} />
        </div>

        <p className="popup-subtitle">Our support team is available for you.</p>

        <a href="tel:+3908118920052" className="contact-card">
          <FiPhone />
          <span>+39 081 1892 0052</span>
        </a>

        <a href="mailto:support@todoai.ai" className="contact-card">
          <FiMail />
          <span>support@todoai.ai</span>
        </a>
      </div>
    </>
  );
};

export default FloatingContactButton;
