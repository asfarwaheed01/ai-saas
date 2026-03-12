import React, { useState } from "react";
import {
  FaRobot,
  FaDatabase,
  FaCreditCard,
  FaChartLine,
  FaShieldAlt,
  FaHeadset,
  FaDownload,
  FaExternalLinkAlt,
  FaShopify,
  FaWordpress,
} from "react-icons/fa";
import "./Services.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FaCloudArrowDown } from "react-icons/fa6";
import { useAuth } from "../../providers/AuthContext";
import AuthPopup from "../../components/AuthPopUp";

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuthPopup, setShowAuthPopup] = useState(false);

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

  // const handleDownloadPlugin = () => {
  //   window.open(
  //     "https://drive.google.com/drive/folders/1I3Cg35SUA4EaB8LeBnirApIDBsc-w9ep",
  //     "_blank"
  //   );
  // };

  const packages = [
    {
      id: "beauty",
      title: "Beauty Salon – €120/month - Try Free for 3 months",
      // title: "Beauty Salon – Try Free for 3 months",
      description:
        "Specialized in beauty and wellness consultations, enhancing customer experience in salons.",
      features: [
        {
          title: "Dedicated Avatar and AI Assistant",
          description:
            "An AI avatar dedicated to beauty consultations, booking and managing appointments.",
        },
        {
          title: "Fully Localized Content",
          description:
            "Available in your preferred language, tailored to regional beauty standards.",
        },
        {
          title: "Personalized Recommendations",
          description:
            "Provides personalized skincare and haircare suggestions for customers.",
        },
        {
          title: "Software License for 1 Windows Device",
          description: "Includes one Windows device license with free updates.",
        },
      ],
      // downloadLink: "https://example.com/beauty-salon.zip",
      androidLink:
        "https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/desktop_programs/beauty_salon/english/SaloonInstaller.rar",
      iosLink:
        "https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/desktop_programs/beauty_salon/italian/salon_program.rar",
    },
    {
      id: "medical",
      title: "Medical Consultant – €120/month –  Try Free for 3 months",
      description:
        "Ideal for clinics, hospitals, and medical practices offering robust support.",
      features: [
        {
          title: "AI Assistant for Medical Practices",
          description:
            "Handles appointment scheduling, follow-ups, and patient education.",
        },
        {
          title: "Guided Patient Support",
          description:
            "Offers multilingual patient support and guided symptom checks.",
        },
        {
          title: "Fully Localized Content",
          description:
            "Complies with local medical terminology and regulations.",
        },
        {
          title: "Software License for 1 Windows Device",
          description: "Includes one Windows device license with updates.",
        },
      ],
      // downloadLink: "https://example.com/medical-consultant.zip",
      androidLink:
        "https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/desktop_programs/medical_consultant/english/MedicalInstaller.rar",
      iosLink:
        "https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/desktop_programs/medical_consultant/italian/Medical_program.rar",
    },
    {
      id: "pharmacist",
      title: "Pharmacist – €120/month – Try Free for 3 months",
      description:
        "Specifically tailored for pharmacies, provides expert advice and guidance.",
      features: [
        {
          title: "Pharmaceutical AI Assistant",
          description:
            "Helps with prescriptions, dosage information and customer queries.",
        },
        {
          title: "Customer Support",
          description:
            "Handles queries about drug interactions and side effects.",
        },
        {
          title: "Fully Localized Content",
          description:
            "Compliant with local pharmacy regulations and language.",
        },
        {
          title: "Software License for 1 Windows Device",
          description: "Includes one Windows device license with free updates.",
        },
      ],
      // downloadLink: "https://example.com/pharmacist.zip",
      androidLink:
        "https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/desktop_programs/pharmacist/english/PharmaInstaller.rar",
      iosLink:
        "https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/desktop_programs/pharmacist/italian/pharmacist_program.rar",
    },
  ];

  const [selectedPackage, setSelectedPackage] = useState(packages[0]);

  const [showDownloadPopup, setShowDownloadPopup] = useState(false);
  const { user } = useAuth();

  const handleShowPopup = (pkg) => {
    if (!user) {
      setShowAuthPopup(true);
      return;
    }
    setSelectedPackage(pkg);
    setShowDownloadPopup(true);
  };

  const handleClosePopup = () => {
    setShowDownloadPopup(false);
  };

  const handleDownload = () => {
    window.open(selectedPackage.downloadLink, "_blank");
  };

  const shopifyPluginLink = "https://shopify.todopharma.com";

  const handleDownloadPlugins = (link) => {
    if (!user) {
      setShowAuthPopup(true);
      return;
    }
    window.open(link, "_blank");
  };

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
          </div>
        ))}
      </div>

      <div className="desktop-app-section">
        <div className="desktop-app-container">
          <div className="desktop-app-header">
            <div className="desktop-app-icon">
              <FaDownload />
            </div>
            <h2>TODO PHARMA AI - Windows In-Store Packages</h2>
            <p>
              Download our powerful desktop application for seamless AI
              integration
            </p>
          </div>

          <div className="desktop-app-content new-layout">
            {/* Left column - Buttons */}
            <div className="package-buttons">
              {packages.map((pkg) => (
                <button
                  key={pkg.id}
                  className={`package-button ${
                    selectedPackage.id === pkg.id ? "active" : ""
                  }`}
                  onClick={() => setSelectedPackage(pkg)}
                  onMouseEnter={() => setSelectedPackage(pkg)}
                >
                  <FaDownload />
                  {pkg.title.split("–")[0].trim()} Package
                </button>
              ))}
            </div>

            {/* Right column - Details */}
            <div className="package-details-card">
              <h3>{selectedPackage.title}</h3>
              <p>{selectedPackage.description}</p>

              <div className="feature-cards-grid">
                {selectedPackage.features.map((f, i) => (
                  <div key={i} className="feature-cards">
                    <h4>{f.title}</h4>
                    <p>{f.description}</p>
                  </div>
                ))}
              </div>

              <div className="btn-center-download">
                {/* <button className="download-button" onClick={handleDownload}>
                  <FaDownload /> Download Now
                  <FaExternalLinkAlt className="external-icon" />
                </button> */}
                <button
                  className="download-button"
                  onClick={() => handleShowPopup(selectedPackage)}
                >
                  <FaDownload /> Download Now
                  <FaExternalLinkAlt className="external-icon" />
                </button>
              </div>
            </div>
          </div>
          {/* </div> */}
          {/* </div> */}
        </div>
      </div>

      {showDownloadPopup && (
        <div className="download-popup-overlay">
          <div className="download-popup">
            <h3>Package You Want</h3>
            <p>{selectedPackage.title}</p>
            <div className="popup-buttons">
              <button
                onClick={() =>
                  window.open(selectedPackage.androidLink, "_self")
                }
                className="popup-download-btn android"
              >
                Download English Version
                <FaCloudArrowDown
                  className="icon"
                  style={{ marginLeft: "8px" }}
                />
              </button>
              <button
                onClick={() => window.open(selectedPackage.iosLink, "_self")}
                className="popup-download-btn ios"
              >
                Download Italian Version
                <FaCloudArrowDown
                  className="icon"
                  style={{ marginLeft: "35px" }}
                />
              </button>
            </div>
            <button className="popup-close" onClick={handleClosePopup}>
              Close
            </button>
          </div>
        </div>
      )}

      <div className="plugins-section">
        <div className="plugins-container">
          <h2 className="plugins-title">Download Our Plugins</h2>
          <p className="plugins-subtitle">
            Download our Shopify and WordPress plugins to seamlessly integrate
            our advanced Avatar technology into your website or online store.
            These plugins deliver tailored solutions for Medical Consultation,
            Pharmacy, and Beauty Salon niches — enabling you to offer
            interactive, data-driven experiences directly on your platform.
          </p>

          <div className="plugins-buttons">
            <button
              className="plugin-button shopify"
              onClick={() => handleDownloadPlugins(shopifyPluginLink)}
            >
              <FaShopify className="icon" /> Download Shopify Plugin{" "}
              <FaDownload />
            </button>

            <Link
              onClick={(e) => {
                e.preventDefault();
                if (!user) {
                  setShowAuthPopup(true);
                  return;
                }
                window.open(
                  "https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/plugins/todopharma-wordpress-plugin-updated-v3.zip",
                  "_blank",
                );
              }}
            >
              <button className="plugin-button wordpress">
                <FaWordpress color="white" className="icon" /> Download
                WordPress Plugin <FaDownload />
              </button>
            </Link>
            {showAuthPopup && (
              <AuthPopup
                onClose={() => setShowAuthPopup(false)}
                redirectPath={location.pathname}
                onSuccess={() => {
                  setShowAuthPopup(false);
                }}
              />
            )}
          </div>
        </div>
      </div>

      <div className="services-cta">
        <div className="cta-content">
          {/* <h2>Ready to transform your customer experience?</h2> */}
          <h2>Build with Our API</h2>
          <p>
            {/* Get started with our AI-powered customer service platform today. */}
            Empower your applications with our AI-driven platform. Explore our
            API documentation to learn how to integrate, automate, and innovate
            with powerful endpoints and developer tools.
          </p>
          <div className="cta-buttons">
            <button className="primary-button" onClick={handleClick}>
              View API Docs
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
