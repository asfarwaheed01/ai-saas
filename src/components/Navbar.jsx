import React, { useState, useEffect } from "react";
import { ROUTES } from "../routes/routes";
import "../pages/NotFound/NotFound.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext";
import "./Navbar.css";
import { IoChevronDown } from "react-icons/io5";
import { HiLogout } from "react-icons/hi";

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
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

  const handleLogout = () => {
    try {
      logout();
      setIsUserDropdownOpen(false);
      navigate(ROUTES.login.path);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Close user dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserDropdownOpen && !event.target.closest(".user-info.dropdown")) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [isUserDropdownOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // Don't close user dropdown when mobile menu toggles
  };

  const toggleUserDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleClick = () => {
    navigate(ROUTES.login.path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  console.log("is user dropdown open", isUserDropdownOpen);
  const location = useLocation();

  const isAuthPage =
    (location.pathname === "/login" ||
      location.pathname === "/signup" ||
      location.pathname === "/payment-success" ||
      location.pathname === "/payment-fail" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/change-password" ||
      location.pathname.startsWith("/verify-email/") ||
      location.pathname === "/reset-password") &&
    !isScrolled;

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={closeMobileMenu}>
            {/* <img src="/images/logo.png" alt="logo" className="logo-navbar" /> */}
            <img
              src={isAuthPage ? "/images/logo todo 1.png" : "/images/logo.png"}
              alt="logo"
              className="logo-navbar"
            />
          </Link>
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="hamburger" onClick={toggleMobileMenu}>
          <span className={isMobileMenuOpen ? "bar active" : "bar"}></span>
          <span className={isMobileMenuOpen ? "bar active" : "bar"}></span>
          <span className={isMobileMenuOpen ? "bar active" : "bar"}></span>
        </div>

        {/* Navbar Links */}
        <ul
          className={`navbar-links ${isMobileMenuOpen ? "active" : ""} ${
            !isMobileMenuOpen && isAuthPage ? "white-links" : "black-links"
          }`}
        >
          <li className="navbar-item">
            <Link to={ROUTES.services.path} onClick={closeMobileMenu}>
              Services
            </Link>
          </li>
          <li className="navbar-item">
            <Link to={ROUTES.docsGettingStarted.path} onClick={closeMobileMenu}>
              API Docs
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact-us" onClick={closeMobileMenu}>
              Contact Us
            </Link>
          </li>
          <li className="navbar-item">
            <Link
              // href="https://web.todopharma.com/pricing"
              to="/pricing-plans"
              onClick={closeMobileMenu}
            >
              Pricing Plans
            </Link>
          </li>

          <li className="navbar-item">
            <Link to="/about-us" onClick={closeMobileMenu}>
              About Us
            </Link>
          </li>

          {/* Mobile-only user menu items */}
          {isAuthenticated && (
            <>
              {/* <li className="navbar-item mobile-only">
                <Link to={ROUTES.dashboard.path} onClick={closeMobileMenu}>
                  Dashboard
                </Link>
              </li> */}
              <li className="navbar-item mobile-only">
                <Link to={ROUTES.avatars.path} onClick={closeMobileMenu}>
                  Try out Avatars
                </Link>
              </li>
              <li className="navbar-item mobile-only">
                <Link to={ROUTES.apiKeys.path} onClick={closeMobileMenu}>
                  Create API key
                </Link>
              </li>
              <li className="navbar-item mobile-only">
                <Link
                  to={ROUTES.manageSubscription.path}
                  onClick={closeMobileMenu}
                >
                  Manage Subscription
                </Link>
              </li>
              <li className="navbar-item mobile-only">
                <Link to={ROUTES.changePassword.path} onClick={closeMobileMenu}>
                  Change Password
                </Link>
              </li>

              <li className="navbar-item mobile-only">
                <Link to="/" onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            </>
          )}

          {/* Mobile-only login button */}
          {!isAuthenticated && (
            <li className="navbar-item mobile-only">
              <button
                className="navbar-button mobile"
                onClick={() => {
                  handleClick();
                  closeMobileMenu();
                }}
              >
                Get started <i className="arrow-right">➔</i>
              </button>
            </li>
          )}
        </ul>

        {/* Right Side - Desktop Only */}
        <div className="navbar-right desktop-only">
          {isAuthenticated ? (
            <div className="user-info dropdown">
              <div className="user-display" onClick={toggleUserDropdown}>
                {/* <span className="user-name">{user?.name || user?.email}</span> */}
                <span
                  className={`user-name ${
                    !isMobileMenuOpen && isAuthPage
                      ? "white-text"
                      : "black-text"
                  }`}
                >
                  {user?.name || user?.email}
                </span>

                <div className="user-avatar">
                  {user?.avatar ? (
                    <img src={user.avatar} alt="User avatar" />
                  ) : (
                    <div className="avatar-placeholder-navbar">
                      {user?.name
                        ? user.name.charAt(0).toUpperCase()
                        : user?.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
                <IoChevronDown
                  className={`dropdown-arrow ${
                    isUserDropdownOpen ? "open" : ""
                  }`}
                />
              </div>

              {isUserDropdownOpen && (
                <div className="navbar-dropdown-menu">
                  {/* <Link
                    to={ROUTES.dashboard.path}
                    className="dropdown-item"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Dashboard
                  </Link> */}
                  {user?.is_superuser && (
                    <Link
                      to="/dashboard"
                      className="dropdown-item"
                      onClick={() => setIsUserDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <Link
                    to={ROUTES.avatars.path}
                    className="dropdown-item"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Try out Avatars
                  </Link>
                  <Link
                    to={ROUTES.apiKeys.path}
                    className="dropdown-item"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Create API key
                  </Link>
                  <Link
                    to={ROUTES.manageSubscription.path}
                    className="dropdown-item"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Manage Subscription
                  </Link>
                  <Link
                    to={ROUTES.changePassword.path}
                    className="dropdown-item"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Change Password
                  </Link>
                  <Link to="/" className="dropdown-item" onClick={handleLogout}>
                    <HiLogout className="icon-down" /> Logout
                  </Link>
                </div>
              )}
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
