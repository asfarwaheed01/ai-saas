import React, { useState, useEffect } from "react";
import { ROUTES } from "../routes/routes";
import Logo from "../image/logo.jpeg";
import "../pages/NotFound/NotFound.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
const Navbar = () => {
  const { isAuthenticated, user } = useAuth();
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
    navigate(ROUTES.login.path);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/">
            <img src={Logo} alt="logo" className="logo-navbar" />
          </Link>
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
            <Link to={ROUTES.services.path}>Services</Link>
          </li>
          <li className="navbar-item">
            <Link to={ROUTES.docsGettingStarted.path}>Docs</Link>
          </li>

          <li className="navbar-item">
            <Link to="/contact-us">Contact Us</Link>
          </li>

          <li className="navbar-item">
            <Link to="/pricing-plans">Pricing Plans</Link>
          </li>
        </ul>

        {/* Right Side */}
        <div className={`navbar-right ${isMobileMenuOpen ? "active" : ""}`}>
          {isAuthenticated ? (
            <div className="user-info">
              <span className="user-name">{user?.name || user?.email}</span>
              <div className="user-avatar">
                {user?.avatar ? (
                  <img src={user.avatar} alt="User avatar" />
                ) : (
                  <div className="avatar-placeholder">
                    {user?.name
                      ? user.name.charAt(0).toUpperCase()
                      : user?.email?.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <button className="navbar-button" onClick={handleClick}>
              Get started <i className="arrow-right">➔</i>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
