// // import React from "react";

// // const ResetPassword = () => {
// //   return <div>ResetPassword</div>;
// // };

// // export default ResetPassword;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Login.css"; // reuse same styles for consistent UI
// import { backendURL } from "../../../config/constants";

// const ResetPassword = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     newPassword: "",
//     confirmPassword: "",
//   });
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [message, setMessage] = useState("");
//   const [passwordStrength, setPasswordStrength] = useState({
//     label: "",
//     color: "",
//   });

//   // ✅ Function to check password strength
//   const getPasswordStrength = (password) => {
//     let strength = { label: "Weak", color: "red" };
//     if (!password) return { label: "", color: "" };

//     const hasLower = /[a-z]/.test(password);
//     const hasUpper = /[A-Z]/.test(password);
//     const hasNumber = /\d/.test(password);
//     const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
//     const lengthGood = password.length >= 8;

//     const score = [
//       hasLower,
//       hasUpper,
//       hasNumber,
//       hasSpecial,
//       lengthGood,
//     ].filter(Boolean).length;

//     if (score <= 2) strength = { label: "Weak", color: "#e74c3c" }; // red
//     else if (score === 3)
//       strength = { label: "Medium", color: "#f1c40f" }; // yellow
//     else if (score >= 4) strength = { label: "Strong", color: "#2ecc71" }; // green

//     return strength;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setError("");
//     setMessage("");

//     if (name === "newPassword") {
//       setPasswordStrength(getPasswordStrength(value));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (formData.newPassword !== formData.confirmPassword) {
//       setError("Passwords do not match!");
//       return;
//     }

//     if (formData.newPassword.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       // Example API call — adjust endpoint to your backend route
//       const response = await fetch(`${backendURL}/users/reset-password/`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ password: formData.newPassword }),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.error || "Failed to reset password");
//       }

//       setMessage("✅ Your password has been reset successfully!");
//       setFormData({ newPassword: "", confirmPassword: "" });
//       setPasswordStrength({ label: "", color: "" });

//       // Navigate back to login after 2 seconds
//       setTimeout(() => navigate("/login"), 2000);
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
//             <div className="logo-icon">🔑</div>
//             <h1 className="logo-text">Reset Password</h1>
//           </div>
//           <p className="login-subtitle">
//             Enter your new password below to reset your account.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="login-form">
//           {/* New Password */}
//           <div className="form-group">
//             <label htmlFor="newPassword" className="form-label">
//               New Password
//             </label>
//             <div className="input-wrapper">
//               <span className="input-icon">🆕</span>
//               <input
//                 type="password"
//                 id="newPassword"
//                 name="newPassword"
//                 value={formData.newPassword}
//                 onChange={handleChange}
//                 className="form-input"
//                 placeholder="Enter new password"
//                 required
//                 disabled={isLoading}
//               />
//             </div>

//             {/* Password Strength Indicator */}
//             {passwordStrength.label && (
//               <p
//                 className="password-strength"
//                 style={{
//                   color: passwordStrength.color,
//                   fontWeight: "600",
//                   marginTop: "5px",
//                   fontSize: "0.9rem",
//                 }}
//               >
//                 Strength: {passwordStrength.label}
//               </p>
//             )}
//           </div>

//           {/* Confirm Password */}
//           <div className="form-group">
//             <label htmlFor="confirmPassword" className="form-label">
//               Confirm Password
//             </label>
//             <div className="input-wrapper">
//               <span className="input-icon">✅</span>
//               <input
//                 type="password"
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="form-input"
//                 placeholder="Re-enter new password"
//                 required
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="error-message">
//               <span className="error-icon">⚠️</span> {error}
//             </div>
//           )}

//           {/* Success Message */}
//           {message && (
//             <div className="success-message">
//               <span className="success-icon">🎉</span> {message}
//             </div>
//           )}

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={
//               isLoading ||
//               !formData.newPassword ||
//               !formData.confirmPassword ||
//               formData.newPassword !== formData.confirmPassword
//             }
//             className={`login-submit-btn ${isLoading ? "loading" : ""}`}
//           >
//             {isLoading ? (
//               <>
//                 <span className="loading-spinner"></span> Resetting...
//               </>
//             ) : (
//               <>
//                 <span className="auth-icon">🔓</span> Reset Password
//               </>
//             )}
//           </button>
//         </form>

//         <div className="login-toggle">
//           <p className="toggle-text">
//             Go back to{" "}
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

// export default ResetPassword;

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
        }
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
