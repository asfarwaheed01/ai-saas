// import React from "react";
// import "./PricingPlans.css";

// const PricingPlans = () => {

//   return (
//     <div className="pricing-page">
//       <div className="pricing-header">
//         <h1>Prcing Plans</h1>
//       </div>
//     </div>
//   );
// };

// export default PricingPlans;

import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "./PricingPlans.css";

const PricingPlans = () => {
  const plans = [
    {
      name: "Basic",
      price: 14,
      subtitle: "Best for individuals",
      features: [
        { text: "Access to basic features", included: true },
        { text: "Email support", included: true },
        { text: "Advanced analytics", included: false },
        { text: "Team collaboration", included: false },
      ],
    },
    {
      name: "Standard",
      price: 29,
      subtitle: "Best for small teams",
      features: [
        { text: "All basic features", included: true },
        { text: "Priority email support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Team collaboration", included: false },
      ],
    },
    {
      name: "Pro",
      price: 49,
      subtitle: "For growing businesses",
      features: [
        { text: "All standard features", included: true },
        { text: "24/7 support", included: true },
        { text: "Advanced analytics", included: true },
        { text: "Team collaboration", included: true },
      ],
    },
    {
      name: "Enterprise",
      price: 99,
      subtitle: "For large companies",
      features: [
        { text: "Unlimited access", included: true },
        { text: "Dedicated support", included: true },
        { text: "Custom integrations", included: true },
        { text: "Team collaboration", included: true },
      ],
    },
    {
      name: "Custom",
      price: 199,
      subtitle: "Tailored for you",
      features: [
        { text: "Everything in Enterprise", included: true },
        { text: "Dedicated account manager", included: true },
        { text: "On-premise deployment", included: true },
        { text: "Custom SLA", included: true },
      ],
    },
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Pricing Plans</h1>
      </div>

      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div className="pricing-card" key={index}>
            <h2 className="plan-name">{plan.name}</h2>
            <div className="plan-price">
              <span className="price">€{plan.price}</span>
              <span className="per">/MESE</span>
            </div>
            <h3 className="plan-subtitle">{plan.subtitle}</h3>
            <ul className="plan-features">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className={feature.included ? "included" : "excluded"}
                >
                  {feature.included ? (
                    <FaCheckCircle className="icon included-icon" />
                  ) : (
                    <FaTimesCircle className="icon excluded-icon" />
                  )}
                  {feature.text}
                </li>
              ))}
            </ul>
            <button className="subscribe-btn">Subscribe</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
