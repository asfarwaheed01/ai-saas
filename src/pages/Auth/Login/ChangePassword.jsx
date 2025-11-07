import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // reuse same styles for consistent UI
import { backendURL } from "../../../config/constants";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [passwordStrength, setPasswordStrength] = useState({
    label: "",
    color: "",
  });

  // ✅ Function to check password strength
  const getPasswordStrength = (password) => {
    let strength = { label: "Weak", color: "red" };
    if (!password) return { label: "", color: "" };

    const hasLower = /[a-z]/.test(password);
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const lengthGood = password.length >= 8;

    const score = [
      hasLower,
      hasUpper,
      hasNumber,
      hasSpecial,
      lengthGood,
    ].filter(Boolean).length;

    if (score <= 2) strength = { label: "Weak", color: "#e74c3c" };
    else if (score === 3) strength = { label: "Medium", color: "#f1c40f" };
    else if (score >= 4) strength = { label: "Strong", color: "#2ecc71" };

    return strength;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
    setMessage("");

    if (name === "newPassword") {
      setPasswordStrength(getPasswordStrength(value));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (formData.newPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    setIsLoading(true);

    try {
      // ✅ Adjust to match your actual backend route
      const response = await fetch(`${backendURL}/users/change-password/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // assuming JWT auth
        },
        body: JSON.stringify({
          current_password: formData.currentPassword,
          new_password: formData.newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to change password");
      }

      setMessage("✅ Your password has been changed successfully!");
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordStrength({ label: "", color: "" });

      // Redirect back to login after 2 seconds
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
          <div className="shape shape-5"></div>
        </div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <div className="logo">
            <div className="logo-icon">🔒</div>
            <h1 className="logo-text">Change Password</h1>
          </div>
          <p className="login-subtitle">
            Enter your current and new password below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {/* Current Password */}
          <div className="form-group">
            <label htmlFor="currentPassword" className="form-label">
              Current Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter current password"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* New Password */}
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">🆕</span>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Enter new password"
                required
                disabled={isLoading}
              />
            </div>

            {passwordStrength.label && (
              <p
                className="password-strength"
                style={{
                  color: passwordStrength.color,
                  fontWeight: "600",
                  marginTop: "5px",
                  fontSize: "0.9rem",
                }}
              >
                Strength: {passwordStrength.label}
              </p>
            )}
          </div>

          {/* Confirm New Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm New Password
            </label>
            <div className="input-wrapper">
              <span className="input-icon">✅</span>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="form-input"
                placeholder="Re-enter new password"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span> {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="success-message">
              <span className="success-icon">🎉</span> {message}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={
              isLoading ||
              !formData.currentPassword ||
              !formData.newPassword ||
              !formData.confirmPassword ||
              formData.newPassword !== formData.confirmPassword
            }
            className={`login-submit-btn ${isLoading ? "loading" : ""}`}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span> Changing...
              </>
            ) : (
              <>
                <span className="auth-icon">🔐</span> Change Password
              </>
            )}
          </button>
        </form>

        <div className="login-toggle">
          <p className="toggle-text">
            Want to go back?{" "}
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="toggle-btn"
              disabled={isLoading}
            >
              Sign In
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
