import React, { useState, useEffect } from "react";
import { ROUTES } from "../routes/routes";
import Logo from "../image/logo.jpeg";
import "../pages/NotFound/NotFound.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
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

  const handleClick = () => {
    navigate(ROUTES.docsGettingStarted.path);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          {/* {" "} */}
          {/* <a href="/">
            <span className="logo-icon">AI</span> Avatars
          </a>{" "} */}
          <a href="/">
            <img src={Logo} alt="logo" className="logo-navbar" />
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
            {/* <span className="dropdown-toggle" onClick={toggleDropdown}>
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
            </ul> */}
            <a href={ROUTES.services.path}>Services</a>
          </li>
          <li className="navbar-item">
            <a href={ROUTES.docsGettingStarted.path}>Docs</a>
          </li>
          {/* <li className="navbar-item">
            <a href="/resources">Resources</a>
          </li>
          <li className="navbar-item">
            <a href="/pricing">Pricing</a>
          </li> */}
          <li className="navbar-item">
            <a href="/contact-us">Contact Us</a>
          </li>
        </ul>

        {/* Right Side */}
        <div className={`navbar-right ${isMobileMenuOpen ? "active" : ""}`}>
          <button className="navbar-button" onClick={handleClick}>
            Get started <i className="arrow-right">➔</i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
