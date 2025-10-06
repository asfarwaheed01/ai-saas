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
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../routes/routes";
import { FaCloudArrowDown } from "react-icons/fa6";

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

  // const handleDownloadPlugin = () => {
  //   window.open(
  //     "https://drive.google.com/drive/folders/1I3Cg35SUA4EaB8LeBnirApIDBsc-w9ep",
  //     "_blank"
  //   );
  // };

  const packages = [
    {
      id: "beauty",
      title: "Beauty Salon – €120/month",
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
      title: "Medical Consultant – €120/month",
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
      title: "Pharmacist – €120/month",
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

  const handleShowPopup = (pkg) => {
    setSelectedPackage(pkg);
    setShowDownloadPopup(true);
  };

  const handleClosePopup = () => {
    setShowDownloadPopup(false);
  };

  const handleDownload = () => {
    window.open(selectedPackage.downloadLink, "_blank");
  };

  const shopifyPluginLink = "https://example.com/shopify-plugin.zip";
  // const wordpressPluginLink = "https://example.com/wordpress-plugin.zip";

  const handleDownloadPlugins = (link) => {
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
            {/* <button className="service-button">Learn More</button> */}
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

          {/* <div className="desktop-app-content">
            <div className="app-info">
              <div className="app-feature">
                <FaRobot className="feature-icon" />
                <div className="feature-content">
                  <h3>AI-Powered Desktop Client</h3>
                  <p>
                    Full-featured desktop application with advanced AI
                    capabilities and local processing power.
                  </p>
                </div>
              </div>

              <div className="app-feature">
                <FaShieldAlt className="feature-icon" />
                <div className="feature-content">
                  <h3>Secure & Private</h3>
                  <p>
                    Enhanced security with local data processing and encrypted
                    communications.
                  </p>
                </div>
              </div>

              <div className="app-feature">
                <FaChartLine className="feature-icon" />
                <div className="feature-content">
                  <h3>Advanced Features</h3>
                  <p>
                    Access to premium features, offline capabilities, and
                    enhanced performance.
                  </p>
                </div>
              </div>
            </div>

            <div className="app-download">
              <div className="download-card">
                <div className="download-header">
                  <FaDownload className="download-icon" />
                  <h3>Download Desktop App</h3>
                </div>
                <p>Get access to our complete desktop application package:</p>
                <ul className="download-features">
                  <li>Windows Desktop Application</li>
                  <li>macOS Desktop Application</li>
                  <li>Installation Guides & Documentation</li>
                  <li>Configuration & Setup Files</li>
                </ul>
                <button
                  className="download-button"
                  onClick={handleDownloadPlugin}
                >
                  <FaDownload />
                  Download Desktop App
                  <FaExternalLinkAlt className="external-icon" />
                </button>
                <p className="download-note">
                  <small>
                    Access our Google Drive folder with all desktop app
                    resources
                  </small>
                </p>
              </div>
            </div>
          </div> */}
          {/* <div className="desktop-app-section"> */}
          {/* <div className="desktop-app-container"> */}
          {/* <div className="desktop-app-header">
                <h2>Download Packages</h2>
                <p>Select a package to view its details and download</p>
              </div> */}

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

            {/* <button
              className="plugin-button wordpress"
              onClick={() => handleDownloadPlugins(wordpressPluginLink)}
            >
              <FaWordpress className="icon" /> Download WordPress Plugin{" "}
              <FaDownload />
            </button> */}
            <a
              href="https://todopharma-ai-bucket.s3.eu-central-1.amazonaws.com/plugins/todopharma-wordpress-plugin.zip"
              download
            >
              <button className="plugin-button wordpress">
                <FaWordpress className="icon" /> Download WordPress Plugin{" "}
                <FaDownload />
              </button>
            </a>
          </div>
        </div>
      </div>

      <div className="mobile-apps-section">
        <div className="mobile-apps-container">
          <h2 className="mobile-apps-title">Download Our Mobile Apps</h2>
          <p className="mobile-apps-subtitle">
            Get our AI-powered applications directly on your smartphone with
            full functionality, security, and seamless updates.
          </p>

          <div className="mobile-apps-grid">
            {/* Android Column */}
            <div className="mobile-app-card android">
              <h3>Android Version</h3>
              <p>
                Install the Android version for smooth integration and instant
                access to all features.
              </p>
              <button
                className="mobile-app-btn android"
                onClick={() =>
                  window.open(
                    "https://example.com/todopharma-android.apk",
                    "_blank"
                  )
                }
              >
                <FaCloudArrowDown className="icon" />
                Download Mobile App
              </button>
            </div>

            {/* iOS Column */}
            <div className="mobile-app-card ios">
              <h3>iOS Version</h3>
              <p>
                Download the iOS app for an optimized iPhone and iPad experience
                with full security.
              </p>
              <button
                className="mobile-app-btn ios"
                onClick={() =>
                  window.open(
                    "https://example.com/todopharma-ios.ipa",
                    "_blank"
                  )
                }
              >
                <FaCloudArrowDown className="icon" />
                Download iOS App
              </button>
            </div>
          </div>
        </div>
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
