import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./VerifyEmail.css";
import { backendURL } from "../../../config/constants";

const VerifyEmail = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(
          `${backendURL}/users/verify-email/`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token }),
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || data.error || "Verification failed");
        }

        setStatus("success");
        setMessage("Your email has been successfully verified!");

        // Optional: store verified email if API returns it
        if (data.email) {
          localStorage.setItem("verified_email", data.email);
        }

        // Redirect to login after short delay
        setTimeout(() => {
          navigate("/login");
        }, 2500);
      } catch (err) {
        setStatus("error");
        setMessage(err.message || "Something went wrong during verification");
      }
    };

    if (token) verifyEmail();
  }, [token, navigate]);

  return (
    <div className="verify-email-container">
      {status === "loading" && (
        <div className="verify-card verifying">
          <h2>Verifying your email...</h2>
          <div className="spinner"></div>
        </div>
      )}

      {status === "success" && (
        <div className="verify-card success">
          <h2>✅ Email Verified Successfully!</h2>
          <p>{message}</p>
          <p>Redirecting you to Sign In page...</p>
        </div>
      )}

      {status === "error" && (
        <div className="verify-card error">
          <h2>❌ Verification Failed</h2>
          <p>{message}</p>
          <button onClick={() => navigate("/login")}>Go to Login</button>
        </div>
      )}
    </div>
  );
};

export default VerifyEmail;
