import React from "react";
import "./PaymentFailure.css";
import { FaTimesCircle } from "react-icons/fa";

const PaymentFailure = () => {
  return (
    <div className="payment-failure-container">
      <div className="payment-failure-card">
        <FaTimesCircle className="failure-icon" />
        <h1>Payment Failed ❌</h1>
        <p>
          Oops! Something went wrong while processing your payment. Please try
          again or use a different payment method.
        </p>
        <button
          className="failure-btn"
          onClick={() => (window.location.href = "/checkout")}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentFailure;
