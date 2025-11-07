import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./TryOurAvatars.css";
import { getToken } from "../../config/constants";

const TryOurAvatars = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { token } = getToken();

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <section className="try-avatars-section">
      <div className="container-medium">
        <div className="content-wrapper-try">
          <div className="text-content">
            <h2 className="section-title">
              Bring your digital identity to life
            </h2>
            <p className="section-subtitle">
              {/* Create stunning, personalized avatars that represent the real you.
              Our AI-powered technology brings your digital identity to life
              with incredible detail and authenticity. */}
              Our AI technology brings them to life with realistic detail and
              expressive authenticity, ready to interact across every channel.
              <br />
              You can choose yourself or allow your users to select from a wide
              range of predefined avatars, available in different genders,
              ethnicities, and categories to best fit your brand or audience.
              <br />
              For those seeking an exclusive and fully customized experience,
              TODO AI creates personalized avatars modeled on the client’s image
              and identity through a dedicated tailor made package.
            </p>
            <div className="features-list">
              <div className="feature-item-try">
                <span className="feature-icon">✨</span>
                <span>AI-Powered Generation</span>
              </div>
              <div className="feature-item-try">
                <span className="feature-icon">🎨</span>
                <span>Unlimited Customization</span>
              </div>
              <div className="feature-item-try">
                <span className="feature-icon">⚡</span>
                <span>Instant Results</span>
              </div>
            </div>
            {isLoggedIn ? (
              <Link to="/avatars" className="cta-button">
                <span className="button-text">Try Our Avatars</span>
                <span className="button-icon">→</span>
              </Link>
            ) : (
              <Link to="/login" className="cta-button">
                <span className="button-text">Login to Try Our Avatars</span>
                <span className="button-icon">→</span>
              </Link>
            )}
          </div>
          <div className="visual-content">
            <div className="avatar-showcase">
              <div className="avatar-grid">
                <div className="avatar-placeholder avatar-1"></div>
                <div className="avatar-placeholder avatar-2"></div>
                <div className="avatar-placeholder avatar-3"></div>
                <div className="avatar-placeholder avatar-4"></div>
              </div>
              <div className="floating-elements">
                <div className="floating-element element-1"></div>
                <div className="floating-element element-2"></div>
                <div className="floating-element element-3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TryOurAvatars;
