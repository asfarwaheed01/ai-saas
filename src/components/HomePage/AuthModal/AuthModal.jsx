// import React, { useState } from "react";
// import "./AuthModal.css";
// import { backendURL } from "../../../config/constants";

// const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [isLoading, setIsLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   const [error, setError] = useState("");

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//     // Clear error when user starts typing
//     if (error) setError("");
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError("");

//     try {
//       const endpoint = isLogin ? "/users/signin/" : "/users/signup/";
//       const payload = isLogin
//         ? { email: formData.email, password: formData.password }
//         : {
//             username: formData.username,
//             email: formData.email,
//             password: formData.password,
//           };

//       const response = await fetch(`${backendURL}${endpoint}`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(payload),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(
//           data.message || `${isLogin ? "Login" : "Signup"} failed`
//         );
//       }

//       // Store token in localStorage
//       if (data.access_token || data.token) {
//         const token = data.access_token || data.token;
//         localStorage.setItem("access_token", token);

//         // Call success callback
//         onAuthSuccess(token);

//         // Close modal
//         onClose();

//         // Reset form
//         setFormData({ username: "", email: "", password: "" });
//       } else {
//         throw new Error("No token received from server");
//       }
//     } catch (error) {
//       console.error("Auth error:", error);
//       setError(error.message);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const toggleMode = () => {
//     setIsLogin(!isLogin);
//     setError("");
//     setFormData({ username: "", email: "", password: "" });
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="auth-modal-overlay" onClick={onClose}>
//       <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
//         <button className="auth-modal-close" onClick={onClose}>
//           ×
//         </button>

//         <div className="auth-modal-header">
//           <h2 className="auth-modal-title">
//             {isLogin ? "Welcome Back" : "Create Account"}
//           </h2>
//           <p className="auth-modal-subtitle">
//             {isLogin
//               ? "Sign in to start using AI avatars"
//               : "Join us to experience interactive AI avatars"}
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="auth-form">
//           {!isLogin && (
//             <div className="form-group">
//               <label htmlFor="username" className="form-label">
//                 Username
//               </label>
//               <input
//                 type="text"
//                 id="username"
//                 name="username"
//                 value={formData.username}
//                 onChange={handleInputChange}
//                 className="form-input"
//                 placeholder="Enter your username"
//                 required={!isLogin}
//                 disabled={isLoading}
//               />
//             </div>
//           )}

//           <div className="form-group">
//             <label htmlFor="email" className="form-label">
//               Email
//             </label>
//             <input
//               type="email"
//               id="email"
//               name="email"
//               value={formData.email}
//               onChange={handleInputChange}
//               className="form-input"
//               placeholder="Enter your email"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           <div className="form-group">
//             <label htmlFor="password" className="form-label">
//               Password
//             </label>
//             <input
//               type="password"
//               id="password"
//               name="password"
//               value={formData.password}
//               onChange={handleInputChange}
//               className="form-input"
//               placeholder="Enter your password"
//               required
//               disabled={isLoading}
//             />
//           </div>

//           {error && <div className="error-message">{error}</div>}

//           <button
//             type="submit"
//             disabled={isLoading}
//             className={`auth-submit-btn ${isLoading ? "loading" : ""}`}
//           >
//             {isLoading ? (
//               <>
//                 <span className="loading-spinner"></span>
//                 {isLogin ? "Signing In..." : "Creating Account..."}
//               </>
//             ) : (
//               <>
//                 <span className="auth-icon">{isLogin ? "🔑" : "✨"}</span>
//                 {isLogin ? "Sign In" : "Create Account"}
//               </>
//             )}
//           </button>
//         </form>

//         <div className="auth-toggle">
//           <p className="auth-toggle-text">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button
//               type="button"
//               onClick={toggleMode}
//               className="auth-toggle-btn"
//               disabled={isLoading}
//             >
//               {isLogin ? "Sign Up" : "Sign In"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;

import React, { useState } from "react";
import "./AuthModal.css";
import { backendURL } from "../../../config/constants";

const AuthModal = ({ isOpen, onClose, onAuthSuccess }) => {
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `${isLogin ? "Login" : "Signup"} failed`
        );
      }

      // Updated to match your login page logic - expect access and refresh tokens
      if (data.access && data.refresh) {
        // Store tokens in localStorage
        localStorage.setItem("access_token", data.access);
        localStorage.setItem("refresh_token", data.refresh);

        // Call success callback with the access token
        onAuthSuccess(data.access);

        // Close modal
        onClose();

        // Reset form
        setFormData({ username: "", email: "", password: "" });
      } else {
        // Fallback for different response format
        if (data.access_token || data.token) {
          const token = data.access_token || data.token;
          localStorage.setItem("access_token", token);
          onAuthSuccess(token);
          onClose();
          setFormData({ username: "", email: "", password: "" });
        } else {
          throw new Error("Invalid response format from server");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
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

  if (!isOpen) return null;

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>
          ×
        </button>

        <div className="auth-modal-header">
          <h2 className="auth-modal-title">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="auth-modal-subtitle">
            {isLogin
              ? "Sign in to start using AI avatars"
              : "Join us to experience interactive AI avatars"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="username" className="form-label">
                Username
              </label>
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
          )}

          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
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

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
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

          {error && <div className="error-message">{error}</div>}

          <button
            type="submit"
            disabled={isLoading}
            className={`auth-submit-btn ${isLoading ? "loading" : ""}`}
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

        <div className="auth-toggle">
          <p className="auth-toggle-text">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={toggleMode}
              className="auth-toggle-btn"
              disabled={isLoading}
            >
              {isLogin ? "Sign Up" : "Sign In"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
