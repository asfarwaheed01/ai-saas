// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css"; // Reuse same styles for consistency
// import { backendURL } from "../../../config/constants";
// import { MdOutlineLockReset } from "react-icons/md";

// const ForgotPassword = () => {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");
//     setMessage("");

//     try {
//       const response = await fetch(`${backendURL}/users/forgot-password/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to send reset email");
//       }

//       setMessage("✅ Password reset instructions sent to your email!");
//       setEmail("");
//     } catch (err) {
//       console.error(err);
//       setError(err.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-background">
//         <div className="floating-shapes">
//           <div className="shape shape-1"></div>
//           <div className="shape shape-2"></div>
//           <div className="shape shape-3"></div>
//           <div className="shape shape-4"></div>
//           <div className="shape shape-5"></div>
//         </div>
//       </div>

//       <div className="login-card">
//         <div className="login-header">
//           <div className="logo">
//             {/* <div className="logo-icon">🔐</div> */}
//             <div className="logo-icon">
//               <MdOutlineLockReset />
//             </div>
//             <h1 className="logo-text">Reset Password</h1>
//           </div>
//           <p className="login-subtitle">
//             Enter your email address and we’ll send you instructions to reset
//             your password.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           <div className="form-group">
//             <label htmlFor="email" className="form-label">
//               Email Address
//             </label>
//             <div className="input-wrapper">
//               <span className="input-icon">📧</span>
//               <input
//                 type="email"
//                 id="email"
//                 name="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="form-input"
//                 placeholder="Enter your registered email"
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           {error && (
//             <div className="error-message">
//               <span className="error-icon">⚠️</span> {error}
//             </div>
//           )}

//           {message && (
//             <div className="success-message">
//               <span className="success-icon">✅</span> {message}
//             </div>
//           )}

//           <button
//             type="submit"
//             className={`login-submit-btn ${isLoading ? "loading" : ""}`}
//             disabled={isLoading}
//           >
//             {isLoading ? (
//               <>
//                 <span className="loading-spinner"></span> Sending...
//               </>
//             ) : (
//               <>
//                 <span className="auth-icon">📨</span> Send Reset Link
//               </>
//             )}
//           </button>
//         </form>

//         <div className="login-toggle">
//           <p className="toggle-text">
//             Remembered your password?
//             <button
//               type="button"
//               onClick={() => navigate("/login")}
//               className="toggle-btn"
//               disabled={isLoading}
//             >
//               Sign In
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Reuse same styles for consistency
import { backendURL } from "../../../config/constants";
import { MdOutlineLockReset } from "react-icons/md";
import { ROUTES } from "../../../routes/routes";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      // ✅ Corrected endpoint according to your backend spec
      const response = await fetch(`${backendURL}/users/forget-password/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send reset email");
      }

      // ✅ Match the API’s actual expected response
      setMessage(
        data.message ||
          "If an account with this email exists, a password reset link has been sent."
      );
      setEmail("");
      navigate(ROUTES.resetPassword.path);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong. Please try again.");
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
            <div className="logo-icon">
              <MdOutlineLockReset />
            </div>
            <h1 className="logo-text">Reset Password</h1>
          </div>
          <p className="login-subtitle">
            Enter your email address and we’ll send you instructions to reset
            your password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <div className="input-wrapper">
              <span className="input-icon">📧</span>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
                placeholder="Enter your registered email"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span> {error}
            </div>
          )}

          {message && (
            <div className="success-message">
              <span className="success-msg-icon">✅</span> {message}
            </div>
          )}

          <button
            type="submit"
            className={`login-submit-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading-spinner"></span> Sending...
              </>
            ) : (
              <>
                <span className="auth-icon">📨</span> Send Reset Link
              </>
            )}
          </button>
        </form>

        <div className="login-toggle">
          <p className="toggle-text">
            Remembered your password?{" "}
            <button
              type="button"
              onClick={() => navigate("/login")}
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

export default ForgotPassword;
