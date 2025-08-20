import React, { useState } from "react";
import {
  HiMenu,
  HiX,
  HiHome,
  HiOfficeBuilding,
  HiKey,
  HiChevronDown,
  HiLogout,
} from "react-icons/hi";
import "./DashboardLayout.css";
import Logo from "../assets/logo.jpeg";
import { ROUTES } from "../routes/routes.js";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthContext.jsx";

const DASHBOARD_ROUTES = {
  dashboard: {
    path: ROUTES.dashboard.path,
    name: ROUTES.dashboard.name,
    icon: HiHome,
  },
  organization: {
    path: "/dashboard/organization",
    name: "Organization",
    icon: HiOfficeBuilding,
  },
  apiKeys: {
    path: "/dashboard/api-keys",
    name: "API Keys",
    icon: HiKey,
  },
};

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Get user data from AuthContext
  const { user, logout, isAuthenticated } = useAuth();

  const sidebarItems = [
    {
      icon: DASHBOARD_ROUTES.dashboard.icon,
      label: DASHBOARD_ROUTES.dashboard.name,
      href: DASHBOARD_ROUTES.dashboard.path,
    },
    {
      icon: DASHBOARD_ROUTES.organization.icon,
      label: DASHBOARD_ROUTES.organization.name,
      href: DASHBOARD_ROUTES.organization.path,
    },
    {
      icon: DASHBOARD_ROUTES.apiKeys.icon,
      label: DASHBOARD_ROUTES.apiKeys.name,
      href: DASHBOARD_ROUTES.apiKeys.path,
    },
  ];

  const handleLogout = () => {
    try {
      logout();
      setUserDropdownOpen(false);
      navigate(ROUTES.login.path);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  // Get user's initials for avatar fallback
  const getUserInitials = () => {
    if (!user?.username) return "U";
    return user.username.charAt(0).toUpperCase();
  };

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    navigate(ROUTES.login.path);
    return null;
  }

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div
        className={`dashboard-sidebar ${
          sidebarOpen ? "dashboard-sidebar-open" : ""
        }`}
      >
        <div className="dashboard-sidebar-header">
          <img src={Logo} alt="Logo" className="dashboard-logo" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="dashboard-close-btn"
          >
            <HiX />
          </button>
        </div>

        <nav className="dashboard-nav">
          {sidebarItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`dashboard-nav-item ${
                window.location.pathname === item.href
                  ? "dashboard-nav-item-active"
                  : ""
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              <item.icon className="dashboard-nav-icon" />
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="dashboard-main">
        <header className="dashboard-header">
          <button
            onClick={() => setSidebarOpen(true)}
            className="dashboard-menu-btn"
          >
            <HiMenu />
          </button>

          <div className="dashboard-header-center">
            <span className="dashboard-header-title">Dashboard</span>
          </div>

          <div className="dashboard-user-section">
            <button
              className="dashboard-user-button"
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
            >
              <div className="dashboard-user-avatar">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt="Profile"
                    className="dashboard-user-avatar-img"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                ) : null}
              </div>
              <div className="dashboard-user-info">
                <span className="dashboard-user-name">
                  {user?.username || "User"}
                </span>
              </div>
              <HiChevronDown
                className={`dashboard-dropdown-icon ${
                  userDropdownOpen ? "dashboard-dropdown-icon-open" : ""
                }`}
              />
            </button>

            {userDropdownOpen && (
              <div className="dashboard-user-dropdown">
                <div className="dashboard-dropdown-header">
                  <div className="dashboard-dropdown-user-info">
                    <div className="dashboard-dropdown-avatar">
                      {user?.profile_image ? (
                        <img
                          src={user.profile_image}
                          alt="Profile"
                          className="dashboard-dropdown-avatar-img"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                    </div>
                    <div className="dashboard-dropdown-details">
                      <span className="dashboard-dropdown-name">
                        {user?.username || "User"}
                      </span>
                      <span className="dashboard-dropdown-email">
                        {user?.email || "No email"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="dashboard-dropdown-divider" />
                <button
                  className="dashboard-dropdown-item dashboard-dropdown-item-danger"
                  onClick={handleLogout}
                >
                  <HiLogout />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="dashboard-content">{children}</main>
      </div>

      {sidebarOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {userDropdownOpen && (
        <div
          className="dashboard-overlay"
          onClick={() => setUserDropdownOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;
