import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaDatabase,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";
import "./ManageSubscription.css";
import { backendURL } from "../../config/constants";
import { useAuth } from "../../providers/AuthContext";

const ManageSubscription = () => {
  const { getAccessToken, logout } = useAuth();
  const navigate = useNavigate();
  const [subscription, setSubscription] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const apiHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    }),
    [getAccessToken]
  );

  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  const fetchActiveSubscription = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${backendURL}/payments/active-subscription`,
        {
          method: "GET",
          headers: apiHeaders,
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSubscription(data);
    } catch (err) {
      console.error("Error fetching active subscription:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized]);

  useEffect(() => {
    fetchActiveSubscription();
  }, [fetchActiveSubscription]);

  return (
    <div className="manage-subscription-container">
      <h1 className="manage-title">My Subscriptions</h1>

      {isLoading ? (
        <div className="loading-text">Loading subscription details...</div>
      ) : subscription ? (
        <div className="subscription-card">
          <h2 className="plan-name">{subscription.plan?.name}</h2>
          <p className="plan-price">
            €{subscription.plan?.price}
            <span className="per"> /month</span>
          </p>

          <div className="plan-details">
            <div className="detail-item">
              <FaCheckCircle className="icon" />
              <span>
                <strong>API Requests:</strong> {subscription.plan?.api_requests}
              </span>
            </div>
            <div className="detail-item">
              <FaDatabase className="icon" />
              <span>
                <strong>PDF Uploads:</strong> {subscription.plan?.pdf_uploads}
              </span>
            </div>
            <div className="detail-item">
              <FaCalendarAlt className="icon" />
              <span>
                <strong>Start Date:</strong>{" "}
                {/* {new Date(subscription.start_date).toLocaleDateString()} */}
                {subscription.start_date
                  ? new Date(subscription.start_date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="detail-item">
              <FaClock className="icon" />
              <span>
                <strong>Expiry Date:</strong>{" "}
                {/* {new Date(subscription.expiry_date).toLocaleDateString() ||
                  "N/A"} */}
                {subscription.expiry_date
                  ? new Date(subscription.expiry_date).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className="detail-item">
              <FaClock className="icon" />
              <span>
                <strong>Days Remaining:</strong> {subscription.days_remaining}{" "}
                days
              </span>
            </div>
            <div className="detail-item">
              <FaDatabase className="icon" />
              <span>
                <strong>Remaining API Requests:</strong>{" "}
                {subscription.remaining_api_requests}
              </span>
            </div>
            <div className="detail-item">
              <FaCheckCircle className="icon" />
              <span>
                <strong>Status:</strong>{" "}
                {subscription.status ? (
                  <span className="active-status">Active</span>
                ) : (
                  <span className="inactive-status">Inactive</span>
                )}
              </span>
            </div>
          </div>

          <button
            className="upgrade-btn"
            onClick={() => navigate("/pricing-plans")}
          >
            Upgrade Plan
          </button>
        </div>
      ) : (
        <p className="no-subscription-text">
          You don’t have any active subscription.
        </p>
      )}
    </div>
  );
};

export default ManageSubscription;
