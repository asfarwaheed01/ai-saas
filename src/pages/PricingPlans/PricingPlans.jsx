import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaInfoCircle } from "react-icons/fa";
import "./PricingPlans.css";
import { useAuth } from "../../providers/AuthContext";
import { backendURL } from "../../config/constants";
import { loadStripe } from "@stripe/stripe-js";
import { data, useLocation } from "react-router-dom";
import AuthPopup from "../../components/AuthPopUp";
const EUR_TO_USD_RATE = 1.16; // 1.16 multiplier for proportional 2x scaling (€50=$58, €100=$116, €200=$232)

const PricingPlans = () => {
  const { getAccessToken, logout } = useAuth();
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  const location = useLocation();
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currency, setCurrency] = useState("EUR");

  const roundToWholeNumber = (num) => {
    const integerPart = Math.floor(num);
    const decimalPart = num - integerPart;
    return decimalPart >= 0.5 ? Math.ceil(num) : Math.floor(num);
  };

  const formatPrice = (euroPrice, selectedCurrency) => {
    const numericPrice = parseFloat(euroPrice) || 0;
    if (numericPrice === 0) {
      return {
        symbol: selectedCurrency === "USD" ? "$" : "€",
        amount: 0,
      };
    }

    const rawUsdValue = numericPrice * EUR_TO_USD_RATE;
    const usdPrice = roundToWholeNumber(rawUsdValue);

    if (selectedCurrency === "USD") {
      return {
        symbol: "$",
        amount: usdPrice,
      };
    }

    return {
      symbol: "€",
      amount: numericPrice,
    };
  };

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  const apiHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    }),
    [getAccessToken],
  );

  const fetchPricing = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${backendURL}/payments/plans`, {
        method: "GET",
      });

      if (response.status === 401) {
        handleUnauthorized();

        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const sortedPlans = (Array.isArray(data) ? data : null).sort(
        (a, b) => a.priority - b.priority,
      );

      setPlans(sortedPlans);
    } catch (err) {
      console.error("Error fetching Plan Pricing:", err);
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized]);

  useEffect(() => {
    fetchPricing();
  }, []);

  const token = getAccessToken();

  const handleSubscribe = async (plan) => {
    if (!token) {
      setShowAuthPopup(true);
      return;
    }
    try {
      const response = await fetch(`${backendURL}/payments/stripe-payment`, {
        method: "POST",
        headers: apiHeaders,
        body: JSON.stringify({
          sub_plan_id: plan.id,
        }),
      });

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (response.status === 400) {
        const data = await response.json();
        setErrorMessage(
          data?.error || "Something went wrong while subscribing.",
        );
        setShowErrorPopup(true);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payment Response:", data);

      if (data?.session_id) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.session_id });
      } else {
        await fetchActiveSubscription();
      }
    } catch (err) {
      console.error("Error during subscription:", err);
    }
  };

  const fetchActiveSubscription = useCallback(async () => {
    try {
      const response = await fetch(
        `${backendURL}/payments/active-subscription`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getAccessToken()}`,
          },
        },
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Active Subscription:", data);
      setActiveSubscription(data);
    } catch (err) {
      console.error("Error fetching active subscription:", err);
    }
  }, [getAccessToken, handleUnauthorized]);

  useEffect(() => {
    const init = async () => {
      await fetchActiveSubscription();
      await fetchPricing();
    };
    init();
  }, [fetchActiveSubscription, fetchPricing]);
  const handleCancelSubscription = async () => {
    try {
      const response = await fetch(
        `${backendURL}/payments/cancel-subscription`,
        {
          method: "POST",
          headers: apiHeaders,
        },
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Cancel Subscription Response:", data);

      await fetchActiveSubscription();
    } catch (err) {
      console.error("Error cancelling subscription:", err);
    }
  };

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Pricing Plans</h1>
      </div>

      {/* Notice Banner for Shopify & WordPress users (Info theme, top position) */}
      <div className="in-app-notice-banner info-theme">
        <FaInfoCircle className="notice-icon" />
        <span>
          <strong>Notice:</strong> Shopify app users and WordPress plugin users
          must purchase and manage plan subscriptions directly within their
          respective app/plugin interface.
        </span>
      </div>

      {/* Currency Switcher Toggle */}
      <div className="currency-toggle-container">
        <span className="currency-label">Currency:</span>
        <div className="currency-toggle-pill">
          <button
            type="button"
            className={`currency-btn ${currency === "EUR" ? "active" : ""}`}
            onClick={() => setCurrency("EUR")}
          >
            € EUR
          </button>
          <button
            type="button"
            className={`currency-btn ${currency === "USD" ? "active" : ""}`}
            onClick={() => setCurrency("USD")}
          >
            $ USD
          </button>
        </div>
      </div>

      {isLoading ? (
        <p>Loading plans...</p>
      ) : (
        <div className="pricing-cards">
          {plans.map((plan, index) => {
            const isActive =
              activeSubscription?.is_subscribed === true &&
              activeSubscription?.plan?.id === plan.id;

            const isFreePlan = plan.name.toLowerCase() === "free";
            const isExpired =
              isFreePlan &&
              activeSubscription?.plan?.id === plan.id &&
              activeSubscription?.remaining_api_requests === 0;

            const priceInfo = formatPrice(plan.price, currency);

            return (
              <div className="pricing-card" key={plan.id || index}>
                <div className="test">
                  <p className="plan-name">{plan.name}</p>
                  <div className="plan-price">
                    <span className="price">
                      {priceInfo.symbol}
                      {priceInfo.amount}
                    </span>
                    <span className="per">/Month</span>
                  </div>
                </div>

                <div className="pricing-card-spacing">
                  <h3 className="plan-subtitle">{plan.description}</h3>
                  <ul className="plan-features">
                    <li>
                      <FaCheckCircle className="icon included-icon" /> API
                      Requests: {plan.api_requests}
                    </li>
                    <li>
                      <FaCheckCircle className="icon included-icon" /> PDF
                      Uploads: {plan.pdf_uploads}
                    </li>
                    <li>
                      <FaCheckCircle className="icon included-icon" /> Domains:{" "}
                      {plan.allowed_domains}
                    </li>
                  </ul>

                  {/* ✅ Button logic starts here */}
                  {/* {isFreePlan ? (
                    isExpired ? (
                      <button className="subscribe-btn expired" disabled>
                        Expired
                      </button>
                    ) : activeSubscription?.plan?.id === plan.id ? (
                      <button className="subscribe-btn subscribed" disabled>
                        Subscribed
                      </button>
                    ) : (
                      <button
                        className="subscribe-btn"
                        onClick={() => handleSubscribe(plan)}
                      >
                        Subscribe
                      </button>
                    )
                  ) : isActive ? (
                    <button
                      className="subscribe-btn cancel"
                      onClick={handleCancelSubscription}
                    >
                      Cancel Subscription
                    </button>
                  ) : (
                    <button
                      className="subscribe-btn"
                      onClick={() => handleSubscribe(plan)}
                    >
                      Subscribe
                    </button>
                  )} */}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {showAuthPopup && (
        <AuthPopup
          onClose={() => setShowAuthPopup(false)}
          redirectPath={location.pathname}
        />
      )}

      {showErrorPopup && (
        <div className="error-popup-overlay">
          <div className="error-popup-box">
            <p>{errorMessage}</p>
            <button onClick={() => setShowErrorPopup(false)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingPlans;
