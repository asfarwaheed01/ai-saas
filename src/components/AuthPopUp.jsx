import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AuthPopUp.css";
import { backendURL } from "../config/constants";
import { useAuth } from "../providers/AuthContext";

const AuthPopup = ({ onClose, redirectPath = "/" }) => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const endpoint = isLogin ? "/users/signin/" : "/users/signup/";
      const payload = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            username: formData.username,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(`${backendURL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Authentication failed");

      if (data.access && data.refresh) {
        const loginResult = login(data);

        if (loginResult.success) {
          // ✅ Redirect to /docs/api-keys after success
          // navigate("/docs/api-keys");
          navigate(redirectPath || "/");
          onClose(); // close the popup
        } else {
          throw new Error("Failed to save authentication data");
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div
      className="auth-popup-overlay"
      onClick={(e) => {
        if (e.target.classList.contains("auth-popup-overlay")) {
          onClose();
        }
      }}
    >
      <div className="auth-popup-card">
        <button className="auth-popup-close" onClick={onClose}>
          ✖
        </button>

        <div className="login-card">
          <div className="login-header">
            <div className="logo">
              <div className="logo-icon">🤖</div>
              <h1 className="logo-text">AI Avatars</h1>
            </div>
            <h2 className="login-title">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="login-subtitle">
              {isLogin
                ? "Sign in to start using AI avatars"
                : "Join us to experience interactive AI avatars"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {!isLogin && (
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <div className="input-wrapper">
                  <span className="input-icon">👤</span>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-input"
                    placeholder="Enter your username"
                    required={!isLogin}
                    disabled={isLoading}
                  />
                </div>
              </div>
            )}

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <div className="input-wrapper">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="input-wrapper">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={`login-submit-btn ${isLoading ? "loading" : ""}`}
            >
              {isLoading ? (
                <>
                  <span className="loading-spinner"></span>
                  {isLogin ? "Signing In..." : "Creating Account..."}
                </>
              ) : (
                <>
                  <span className="auth-icon">{isLogin ? "🔑" : "✨"}</span>
                  {isLogin ? "Sign In" : "Create Account"}
                </>
              )}
            </button>
          </form>

          <div className="login-toggle">
            <p className="toggle-text">
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={toggleMode}
                className="toggle-btn"
                disabled={isLoading}
              >
                {isLogin ? "Sign Up" : "Sign In"}
              </button>
            </p>
          </div>

          <div className="login-footer">
            <p>Secure • Fast • Reliable</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPopup;
