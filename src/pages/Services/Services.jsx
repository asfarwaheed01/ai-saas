import React from "react";
import {
  FaRobot,
  FaDatabase,
  FaCreditCard,
  FaChartLine,
  FaShieldAlt,
  FaHeadset,
} from "react-icons/fa";
import "./Services.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";

const Services = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(ROUTES.docsGettingStarted.path);
  };
  const services = [
    {
      id: 1,
      icon: <FaRobot />,
      title: "AI-Powered Agent",
      description:
        "Intelligent conversational agents that provide natural, sales-oriented responses in Italian. Process both text queries and audio recordings to deliver relevant product information.",
      features: [
        "Text and audio processing",
        "Italian language optimization",
        "Context-aware responses",
        "Product-specific knowledge",
      ],
    },
    {
      id: 2,
      icon: <FaDatabase />,
      title: "Knowledge Base Management",
      description:
        "Comprehensive tools for managing your product knowledge base. Upload, organize, and maintain documents across multiple domains to power your AI responses.",
      features: [
        "Document uploading and processing",
        "Domain-specific organization",
        "Vector embeddings for efficient retrieval",
        "Simplified document management",
      ],
    },
    {
      id: 3,
      icon: <FaCreditCard />,
      title: "Subscription Management",
      description:
        "Flexible subscription plans with Stripe integration. Offer tiered access to your services with customized resource limits and domain restrictions.",
      features: [
        "Multiple subscription tiers",
        "Secure Stripe checkout",
        "Domain-specific access controls",
        "Resource usage limits",
      ],
    },
    {
      id: 4,
      icon: <FaChartLine />,
      title: "Advanced Analytics",
      description:
        "Track usage patterns and performance metrics to optimize your customer service operations. Understand how your customers interact with your AI agents.",
      features: [
        "Usage tracking and reporting",
        "Customer interaction analytics",
        "Response quality metrics",
        "Domain-specific insights",
      ],
    },
    {
      id: 5,
      icon: <FaShieldAlt />,
      title: "Enterprise Security",
      description:
        "Industry-leading security measures to protect your data and customer information. Role-based access control and comprehensive audit logs.",
      features: [
        "End-to-end encryption",
        "Role-based access control",
        "Detailed audit logs",
        "GDPR compliance",
      ],
    },
    {
      id: 6,
      icon: <FaHeadset />,
      title: "Dedicated Support",
      description:
        "Premium support services to ensure your success. Get assistance with implementation, optimization, and ongoing operations.",
      features: [
        "Technical implementation support",
        "Regular business reviews",
        "Priority issue resolution",
        "Customization consultation",
      ],
    },
  ];

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Services</h1>
        <p>Powerful tools to enhance your customer service experience</p>
      </div>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.id}>
            <div className="service-icon">{service.icon}</div>
            <h2 className="service-title">{service.title}</h2>
            <p className="service-description">{service.description}</p>
            <div className="service-features">
              <h3>Key Features</h3>
              <ul>
                {service.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <button className="service-button">Learn More</button>
          </div>
        ))}
      </div>

      <div className="services-cta">
        <div className="cta-content">
          <h2>Ready to transform your customer experience?</h2>
          <p>
            Get started with our AI-powered customer service platform today.
          </p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={handleClick}>
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
