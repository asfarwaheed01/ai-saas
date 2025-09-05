// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
// import "./PricingPlans.css";
// import { useAuth } from "../../providers/AuthContext";
// import { backendURL } from "../../config/constants";

// const PricingPlans = () => {
//   const plans = [
//     {
//       name: "Basic",
//       price: 14,
//       subtitle: "Best for individuals",
//       features: [
//         { text: "Access to basic features", included: true },
//         { text: "Email support", included: true },
//         { text: "Advanced analytics", included: false },
//         { text: "Team collaboration", included: false },
//       ],
//     },
//     {
//       name: "Standard",
//       price: 29,
//       subtitle: "Best for small teams",
//       features: [
//         { text: "All basic features", included: true },
//         { text: "Priority email support", included: true },
//         { text: "Advanced analytics", included: true },
//         { text: "Team collaboration", included: false },
//       ],
//     },
//     {
//       name: "Pro",
//       price: 49,
//       subtitle: "For growing businesses",
//       features: [
//         { text: "All standard features", included: true },
//         { text: "24/7 support", included: true },
//         { text: "Advanced analytics", included: true },
//         { text: "Team collaboration", included: true },
//       ],
//     },
//     {
//       name: "Enterprise",
//       price: 99,
//       subtitle: "For large companies",
//       features: [
//         { text: "Unlimited access", included: true },
//         { text: "Dedicated support", included: true },
//         { text: "Custom integrations", included: true },
//         { text: "Team collaboration", included: true },
//       ],
//     },
//     {
//       name: "Custom",
//       price: 199,
//       subtitle: "Tailored for you",
//       features: [
//         { text: "Everything in Enterprise", included: true },
//         { text: "Dedicated account manager", included: true },
//         { text: "On-premise deployment", included: true },
//         { text: "Custom SLA", included: true },
//       ],
//     },
//   ];

//   const { getAccessToken, logout } = useAuth();
//   const [fetchPricingData, setfetchPricingData] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Handle unauthorized errors
//   const handleUnauthorized = useCallback(() => {
//     logout();
//   }, [logout]);

//   // API Headers with memoization
//   const apiHeaders = useMemo(
//     () => ({
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${getAccessToken()}`,
//     }),
//     [getAccessToken]
//   );

//   // Fetch API keys
//   const fetchPricing = useCallback(async () => {
//     try {
//       setIsLoading(true);
//       setError(null);

//       const response = await fetch(
//         `${backendURL}/payments/active-subscription`,
//         {
//           method: "GET",
//           headers: apiHeaders,
//         }
//       );

//       if (response.status === 401) {
//         handleUnauthorized();
//         return;
//       }

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const data = await response.json();
//       fetchPricingData(Array.isArray(data) ? data : []);
//     } catch (err) {
//       console.error("Error fetching Plan Pricng:", err);
//       setError("Failed to load Plan Pricing. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   }, [apiHeaders, handleUnauthorized]);

//   useEffect(() => {
//     fetchPricing();
//   }, [fetchPricing]);

//   return (
//     <div className="pricing-page">
//       <div className="pricing-header">
//         <h1>Pricing Plans</h1>
//       </div>

//       <div className="pricing-cards">
//         {plans.map((plan, index) => (
//           <div className="pricing-card" key={index}>
//             <div className="test">
//               <p className="plan-name">{plan.name}</p>
//               <div className="plan-price">
//                 <span className="price">€{plan.price}</span>
//                 <span className="per">/MESE</span>
//               </div>
//             </div>
//             <div className="pricing-card-spacing">
//               <h3 className="plan-subtitle">{plan.subtitle}</h3>
//               <ul className="plan-features">
//                 {plan.features.map((feature, idx) => (
//                   <li
//                     key={idx}
//                     className={feature.included ? "included" : "included"}
//                   >
//                     {feature.included ? (
//                       <FaCheckCircle className="icon included-icon" />
//                     ) : (
//                       <FaTimesCircle className="icon included-icon" />
//                     )}
//                     {feature.text}
//                   </li>
//                 ))}
//               </ul>
//               <button className="subscribe-btn">Subscribe</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PricingPlans;

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./PricingPlans.css";
import { useAuth } from "../../providers/AuthContext";
import { backendURL } from "../../config/constants";
import { loadStripe } from "@stripe/stripe-js";

const fallbackPlans = [
  {
    id: "4f4790f6-54e5-41fa-a9d5-bcd47640d1a1",
    name: "Epic Plan",
    api_requests: 20000,
    price: 99.0,
    pdf_uploads: 500,
    allowed_domains: "therapy,beauty,consultation,medical",
    description: "For professional users who need more access and storage.",
    priority: 3,
  },
  {
    id: "89f29934-88a3-466b-82ef-06f44ffc9d4a",
    name: "Pro Plan",
    api_requests: 20000,
    price: 49.0,
    pdf_uploads: 250,
    allowed_domains: "therapy,beauty,consultation",
    description: "For professional users who need more access and storage.",
    priority: 2,
  },
  {
    id: "e7ce581b-18bc-4833-a2e0-9ec311ea5ab1",
    name: "Free",
    api_requests: 100,
    price: 0.0,
    pdf_uploads: 5,
    allowed_domains: "beauty",
    description: "A free plan with limited access.",
    priority: 0,
  },
  {
    id: "f405923d-7f97-4da5-bdf6-99269ec946b2",
    name: "Starter Plan",
    api_requests: 5000,
    price: 14.0,
    pdf_uploads: 20,
    allowed_domains: "therapy,beauty",
    description: "A budget-friendly plan with decent features.",
    priority: 1,
  },
];

const PricingPlans = () => {
  const { getAccessToken, logout } = useAuth();
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

  // Handle unauthorized errors
  const handleUnauthorized = useCallback(() => {
    logout();
  }, [logout]);

  // API Headers with memoization
  const apiHeaders = useMemo(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAccessToken()}`,
    }),
    [getAccessToken]
  );

  // Fetch Pricing Plans
  const fetchPricing = useCallback(async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${backendURL}/payments/api_usage/subscription-plans`,
        {
          method: "GET",
          headers: apiHeaders,
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        setPlans(fallbackPlans); // fallback if unauthorized
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setPlans(Array.isArray(data) ? data : fallbackPlans);
    } catch (err) {
      console.error("Error fetching Plan Pricing:", err);
      setPlans(fallbackPlans); // fallback on error
    } finally {
      setIsLoading(false);
    }
  }, [apiHeaders, handleUnauthorized]);

  useEffect(() => {
    fetchPricing();
  }, []);

  // inside PricingPlans component

  const handleSubscribe = async (plan) => {
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

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Payment Response:", data);

      if (data?.session_id) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.session_id });
      } else {
        // Agar checkout_url nahi mila but subscription ban gaya ho
        await fetchActiveSubscription();
      }
    } catch (err) {
      console.error("Error during subscription:", err);
      alert("Subscription failed. Please try again.");
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
      console.log("Active Subscription:", data);
    } catch (err) {
      console.error("Error fetching active subscription:", err);
    }
  }, [getAccessToken, handleUnauthorized]);

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Pricing Plans</h1>
      </div>

      {isLoading ? (
        <p>Loading plans...</p>
      ) : (
        <div className="pricing-cards">
          {plans.map((plan, index) => (
            <div className="pricing-card" key={plan.id || index}>
              <div className="test">
                <p className="plan-name">{plan.name}</p>
                <div className="plan-price">
                  <span className="price">€{plan.price}</span>
                  <span className="per">/MESE</span>
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
                <button
                  className="subscribe-btn"
                  onClick={() => handleSubscribe(plan)}
                >
                  Subscribe
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PricingPlans;
