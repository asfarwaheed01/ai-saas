import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { backendURL } from "../../../config/constants";
import "./Login.css";

const ResetPasswordConfirm = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${backendURL}/users/forget-password-confirm/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uidb64,
            token,
            new_password: newPassword,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to reset password");
      }

      setMessage(data.message || "Password reset successfully!");
      setNewPassword("");
      setConfirmPassword("");

      // Redirect to login after success
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    } catch (err) {
      setError(err.message || "Something went wrong.");
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
          <h1 className="logo-text">Set New Password</h1>
          <p className="login-subtitle">
            Enter your new password below to complete your reset.
          </p>
        </div>

        <form onSubmit={handleReset} className="login-form">
          <div className="form-group">
            <label htmlFor="newPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="form-input"
              placeholder="Enter new password"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-input"
              placeholder="Confirm new password"
              required
            />
          </div>

          {error && <div className="error-message">⚠️ {error}</div>}
          {message && <div className="success-message">✅ {message}</div>}

          <button
            type="submit"
            className={`login-submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span> Resetting...
              </>
            ) : (
              <>
                <span className="auth-icon">🔒</span> Reset Password
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordConfirm;
