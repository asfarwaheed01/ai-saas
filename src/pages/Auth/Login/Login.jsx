import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { backendURL } from "../../../config/constants";
import { useAuth } from "../../../providers/AuthContext";

const Login = () => {
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

  // ✅ New state for popup
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

      if (!response.ok) {
        let apiErrorMessage = "";
        if (data.password && Array.isArray(data.password)) {
          apiErrorMessage = data.password.join(" ");
        } else if (data.email && Array.isArray(data.email)) {
          apiErrorMessage = data.email.join(" ");
        } else if (data.username && Array.isArray(data.username)) {
          apiErrorMessage = data.username.join(" ");
        } else if (data.detail) {
          apiErrorMessage = data.detail;
        } else if (data.error) {
          apiErrorMessage = data.error;
        } else if (Array.isArray(data.non_field_errors)) {
          apiErrorMessage = data.non_field_errors.join(", ");
        } else {
          apiErrorMessage = `${isLogin ? "Login" : "Signup"} failed`;
        }
        throw new Error(apiErrorMessage);
      }

      // ✅ Handle Login
      if (isLogin) {
        if (data.access && data.refresh) {
          const loginResult = login(data);
          if (loginResult.success) {
            setFormData({ username: "", email: "", password: "" });
            if (data.is_superuser) navigate("/dashboard");
            else navigate("/");
          } else {
            throw new Error(
              loginResult.error || "Failed to save authentication data"
            );
          }
        }
      }
      // ✅ Handle Signup success
      else {
        // Signup successful → clear form and redirect to login mode
        setFormData({ username: "", email: "", password: "" });
        setIsLogin(true); // switch to login view
        setError(""); // clear any previous errors
        setShowVerificationPopup(true); // 👈 show popup
        setPopupMessage(
          data.message || data.detail || "Signup completed. Check Your Email!"
        );
        // setShowVerificationPopup(true);
        // Optional: auto-hide popup after a few seconds
        setTimeout(() => setShowVerificationPopup(false), 5000);
        // alert("Account created successfully! Please sign in.");
      }
    } catch (error) {
      console.error("Auth error:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ Hide popup automatically after 10 seconds
  useEffect(() => {
    if (showVerificationPopup) {
      const timer = setTimeout(() => setShowVerificationPopup(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showVerificationPopup]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   setError("");

  //   try {
  //     const endpoint = isLogin ? "/users/signin/" : "/users/signup/";
  //     const payload = isLogin
  //       ? { email: formData.email, password: formData.password }
  //       : {
  //           username: formData.username,
  //           email: formData.email,
  //           password: formData.password,
  //         };

  //     const response = await fetch(`${backendURL}${endpoint}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(payload),
  //     });

  //     const data = await response.json();

  //     // if (!response.ok) {
  //     //   throw new Error(
  //     //     data.message || `${isLogin ? "Login" : "Signup"} failed`
  //     //   );
  //     // }

  //     // if (!response.ok) {
  //     //   let apiError =
  //     //     data.error ||
  //     //     (Array.isArray(data.non_field_errors)
  //     //       ? data.non_field_errors.join(", ")
  //     //       : data.non_field_errors) ||
  //     //     `${isLogin ? "Login" : "Signup"} failed`;

  //     //   throw new Error(apiError);
  //     // }
  //     if (!response.ok) {
  //       let apiErrorMessage = "";

  //       if (data.password && Array.isArray(data.password)) {
  //         apiErrorMessage = data.password.join(" ");
  //       } else if (data.email && Array.isArray(data.email)) {
  //         apiErrorMessage = data.email.join(" ");
  //       } else if (data.username && Array.isArray(data.username)) {
  //         apiErrorMessage = data.username.join(" ");
  //       } else if (data.detail) {
  //         apiErrorMessage = data.detail;
  //       } else if (data.error) {
  //         apiErrorMessage = data.error;
  //       } else if (Array.isArray(data.non_field_errors)) {
  //         apiErrorMessage = data.non_field_errors.join(", ");
  //       } else {
  //         apiErrorMessage = `${isLogin ? "Login" : "Signup"} failed`;
  //       }

  //       throw new Error(apiErrorMessage);
  //     }

  //     // Check if we have the expected response format
  //     if (data.access && data.refresh) {
  //       // Use the auth context login function
  //       const loginResult = login(data);

  //       if (loginResult.success) {
  //         // Reset form
  //         setFormData({ username: " ", email: " ", password: " " });
  //         // navigate("/dashboard");
  //         if (data.is_superuser) {
  //           navigate("/dashboard");
  //         } else {
  //           navigate("/");
  //         }
  //       } else {
  //         throw new Error(
  //           loginResult.error || "Failed to save authentication data"
  //         );
  //       }
  //     }
  //     //  else {
  //     //   throw new Error("Invalid response format from server");
  //     // }
  //   } catch (error) {
  //     console.error("Auth error:", error);
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setFormData({ username: "", email: "", password: "" });
  };

  return (
    <div className="login-container">
      {showVerificationPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>📧 {popupMessage.includes("fail") ? "Error" : "Success"}</h3>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
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

        {/* ✅ Forgot Password link */}
        {isLogin && (
          <div className="forgot-password">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
              className="forgot-password-link"
              disabled={isLoading}
            >
              Forgot Password?
            </button>
          </div>
        )}

        <div className="login-footer">
          <p>Secure • Fast • Reliable</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
