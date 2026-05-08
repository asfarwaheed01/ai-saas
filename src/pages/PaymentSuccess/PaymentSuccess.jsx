import React from "react";
import "./PaymentSuccess.css";
import { FaCheckCircle } from "react-icons/fa";

const PaymentSuccess = () => {
  return (
    <div className="success-page">
      <div className="payment-success-container">
        <div className="payment-success-card">
          <FaCheckCircle className="success-icon" />
          <h1>Payment Successful 🎉</h1>
          <p>Thank you! Your payment has been processed successfully.</p>
          <button
            className="success-btn"
            onClick={() => (window.location.href = "/")}
          >
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
