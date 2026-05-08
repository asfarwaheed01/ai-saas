import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBook,
  FaRocket,
  FaDatabase,
  FaServer,
  FaCreditCard,
  FaVideo,
  FaRobot,
  FaChevronDown,
  FaChevronRight,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { GrOrganization } from "react-icons/gr";
import "./Sidebar.css";
import { ROUTES } from "../../../routes/routes";
import Logo from "../../../assets/logo.png";
import { GoOrganization } from "react-icons/go";

import { IoKeySharp } from "react-icons/io5";

const API_SECTIONS = [
  {
    id: "generate-api-key",
    title: "Generate API Keys",
    icon: <IoKeySharp />,
    path: "/docs/api-keys",
    items: [],
  },
  {
    id: "organizational-context",
    title: "Organization Context",
    icon: <GoOrganization />,
    path: "/docs/organization",
    items: [],
  },
  {
    id: "getting-started",
    title: "Getting API Documentation",
    icon: <FaRocket />,
    path: "/docs/getting-started",
    items: [],
  },
  {
    id: "knowledge-base",
    title: "Knowledge Base",
    icon: <FaDatabase />,
    path: "/docs/knowledge-base",
    items: [
      {
        id: "list-documents",
        title: "List Uploaded Documents",
        path: "/docs/knowledge-base/list-documents",
      },
      {
        id: "upload-documents",
        title: "Upload and Process Document",
        path: "/docs/knowledge-base/upload-documents",
      },
      {
        id: "delete-documents",
        title: "Delete Document Embeddings",
        path: "/docs/knowledge-base/delete-documents",
      },
    ],
  },
  {
    id: "agent",
    title: "AI Agent API",
    icon: <FaRobot />,
    path: "/docs/agent",
    items: [
      {
        id: "process-video",
        title: "Process Video",
        path: "/docs/agent/process-video",
      },
      {
        id: "generate-response",
        title: "Generate Conversational Response",
        path: "/docs/agent/generate-response",
      },
    ],
  },
];

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();

  const [expandedSections, setExpandedSections] = useState(
    API_SECTIONS.map((section) => location.pathname.includes(section.path)),
  );

  const toggleSection = (index) => {
    const newExpandedSections = [...expandedSections];
    newExpandedSections[index] = !newExpandedSections[index];
    setExpandedSections(newExpandedSections);
  };

  const handleSectionClick = (section, index) => {
    if (section.items.length === 0) {
      return;
    }

    toggleSection(index);
  };

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay active"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* <aside className="docs-sidebar"> */}
      <aside className={`docs-sidebar ${isOpen ? "open" : ""}`}>
        <button className="sidebar-close-btn" onClick={() => setIsOpen(false)}>
          <FaTimes />
        </button>
        <div>
          <Link to={ROUTES.home.path}>
            <img src={Logo} alt="TODO AI Logo" className="docs-logo" />
          </Link>
        </div>
        <div className="docs-sidebar-header">
          <FaBook className="docs-sidebar-logo" />
          <h1>API Documentation</h1>
        </div>

        <nav className="docs-sidebar-nav">
          {/* Home link */}
          <div className="docs-sidebar-main-links">
            <Link
              to={ROUTES.home.path}
              className={`docs-sidebar-link ${
                location.pathname === ROUTES.home.path ? "active" : ""
              }`}
            >
              Home
            </Link>
          </div>

          {/* API documentation sections */}
          <div className="docs-sidebar-sections">
            {API_SECTIONS.map((section, index) => (
              <div key={section.id} className="docs-sidebar-section">
                {section.items.length === 0 ? (
                  /* Getting Started - Direct Link with no dropdown */
                  <Link
                    to={section.path}
                    className={`docs-sidebar-section-header ${
                      location.pathname.includes(section.path) ? "active" : ""
                    }`}
                  >
                    <div className="docs-sidebar-section-icon">
                      {section.icon}
                    </div>
                    <span className="docs-sidebar-section-title">
                      {section.title}
                    </span>
                  </Link>
                ) : (
                  /* Other sections with dropdowns */
                  <>
                    <div
                      className={`docs-sidebar-section-header ${
                        location.pathname.includes(section.path) ? "active" : ""
                      }`}
                      onClick={() => handleSectionClick(section, index)}
                    >
                      <div className="docs-sidebar-section-icon">
                        {section.icon}
                      </div>
                      <span className="docs-sidebar-section-title">
                        {section.title}
                      </span>
                      <div className="docs-sidebar-section-arrow">
                        {expandedSections[index] ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </div>
                    </div>

                    <div
                      className={`docs-sidebar-section-items ${
                        expandedSections[index] ? "expanded" : ""
                      }`}
                    >
                      {section.items.map((item) => (
                        <Link
                          key={item.id}
                          to={item.path}
                          className={`docs-sidebar-item ${
                            location.pathname === item.path ? "active" : ""
                          }`}
                        >
                          {item.title}
                        </Link>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
