import React, { useState, useEffect } from "react";
import { ROUTES } from "../routes/routes";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to toggle background color
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false); // Close dropdown when mobile menu toggles
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="/">
            <span className="logo-icon">AI</span> Avatars
          </a>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className={isMobileMenuOpen ? "bar active" : "bar"}></span>
          <span className={isMobileMenuOpen ? "bar active" : "bar"}></span>
          <span className={isMobileMenuOpen ? "bar active" : "bar"}></span>
        </div>

        {/* Navbar Links */}
        <ul className={`navbar-links ${isMobileMenuOpen ? "active" : ""}`}>
          <li className="navbar-item dropdown">
            <span className="dropdown-toggle" onClick={toggleDropdown}>
              Platform <i className="arrow-down"></i>
            </span>
            <ul className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
              <li>
                <a href="/platform/feature1">Feature 1</a>
              </li>
              <li>
                <a href="/platform/feature2">Feature 2</a>
              </li>
              <li>
                <a href="/platform/feature3">Feature 3</a>
              </li>
            </ul>
          </li>
          <li className="navbar-item">
            <a href={ROUTES.docs.path}>Docs</a>
          </li>
          <li className="navbar-item">
            <a href="/resources">Resources</a>
          </li>
          <li className="navbar-item">
            <a href="/pricing">Pricing</a>
          </li>
          <li className="navbar-item">
            <a href="/enterprise">Enterprise</a>
          </li>
        </ul>

        {/* Right Side */}
        <div className={`navbar-right ${isMobileMenuOpen ? "active" : ""}`}>
          <a href="/login" className="navbar-right-link">
            Log in
          </a>
          <a href="/book-demo" className="navbar-right-link">
            Book demo
          </a>
          <button className="navbar-button">
            Get started <i className="arrow-right">➔</i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
