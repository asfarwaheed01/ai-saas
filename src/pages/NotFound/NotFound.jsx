import React from "react";
import { Link } from "react-router-dom";
import {
  FaExclamationTriangle,
  FaHome,
  FaBook,
  FaSearch,
} from "react-icons/fa";
import "./NotFound.css";
import { ROUTES } from "../../routes/routes";

const NotFound = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <div className="not-found-icon">
          <FaExclamationTriangle />
        </div>

        <h1 className="not-found-title">404</h1>
        <h2 className="not-found-subtitle">Page Not Found</h2>

        <p className="not-found-description">
          The page you are looking for doesn't exist or has been moved.
        </p>

        <div className="not-found-suggestions">
          <h3>You might want to:</h3>
          <ul>
            <li>Check the URL for typos</li>
            <li>Go back to the previous page</li>
            <li>Try one of the links below</li>
          </ul>
        </div>

        <div className="not-found-actions">
          <Link to={ROUTES.home.path} className="not-found-button primary">
            <FaHome className="button-icon" /> Go to Home
          </Link>
          <Link
            to={ROUTES.docsGettingStarted.path}
            className="not-found-button secondary"
          >
            <FaBook className="button-icon" /> Documentation
          </Link>
        </div>

        <div className="not-found-search">
          <h3>Looking for something specific?</h3>
          <div className="not-found-search-container">
            <input
              type="text"
              placeholder="Search documentation..."
              className="not-found-search-input"
            />
            <button className="not-found-search-button">
              <FaSearch />
            </button>
          </div>
        </div>

        <div className="not-found-illustration">
          <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg">
            {/* Document icon with missing pages */}
            <g transform="translate(240, 50)">
              <rect
                x="0"
                y="0"
                width="120"
                height="150"
                rx="5"
                fill="#e2e8f0"
              />
              <rect
                x="20"
                y="20"
                width="80"
                height="10"
                rx="2"
                fill="#a0aec0"
              />
              <rect
                x="20"
                y="40"
                width="60"
                height="10"
                rx="2"
                fill="#a0aec0"
              />
              <rect
                x="20"
                y="60"
                width="70"
                height="10"
                rx="2"
                fill="#a0aec0"
              />
              <rect
                x="20"
                y="80"
                width="40"
                height="10"
                rx="2"
                fill="#a0aec0"
              />

              {/* Missing piece */}
              <path d="M120,60 L150,60 L150,90 L120,90 Z" fill="#f0f5fa" />
              <path d="M120,100 L170,100 L170,150 L120,150 Z" fill="#f0f5fa" />

              {/* Code brackets decoration */}
              <text x="30" y="120" fontSize="30" fill="#3182ce">{`{ }`}</text>
            </g>

            {/* Dots pattern */}
            <g>
              {Array.from({ length: 20 }).map((_, index) => (
                <circle
                  key={index}
                  cx={50 + (index % 5) * 30}
                  cy={50 + Math.floor(index / 5) * 30}
                  r="3"
                  fill="#4299e1"
                  opacity="0.3"
                />
              ))}
            </g>

            {/* Dots pattern bottom right */}
            <g>
              {Array.from({ length: 20 }).map((_, index) => (
                <circle
                  key={index}
                  cx={400 + (index % 5) * 30}
                  cy={200 + Math.floor(index / 5) * 30}
                  r="3"
                  fill="#4299e1"
                  opacity="0.3"
                />
              ))}
            </g>

            {/* Decorative path */}
            <path
              d="M50,150 C100,100 200,200 300,150 S450,50 550,150"
              stroke="#63b3ed"
              strokeWidth="3"
              fill="none"
              strokeDasharray="10,10"
              opacity="0.6"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
