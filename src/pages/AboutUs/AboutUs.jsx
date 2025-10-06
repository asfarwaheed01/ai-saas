import React, { useEffect, useRef } from "react";
import "./AboutUs.css";
import Eye from "../../../src/assets/eye.png";
import Programming from "../../../src/assets/pg.png";
import Avatar from "../../../src/assets/mf.jpg";
import Goal from "../../../src/assets/goals.jpeg";
import { Link } from "react-router-dom";
const AboutUs = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    let scrollAmount = 0;

    const interval = setInterval(() => {
      if (scrollContainer) {
        scrollAmount += 1; // speed
        scrollContainer.scrollLeft = scrollAmount;

        // reset to start when end reached
        if (
          scrollContainer.scrollLeft + scrollContainer.clientWidth >=
          scrollContainer.scrollWidth
        ) {
          scrollAmount = 0;
        }
      }
    }, 30); // 30ms = ~33fps

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="about-page">
      <div className="hero">
        <h1>TODO PHARMA AI</h1>
        <p>
          Artificial Intelligence Redefining the Future of Health, Beauty and
          Wellness
        </p>
      </div>

      {/* <div className="section">
        <h2><i className="fas fa-eye"></i> Vision</h2>
        <p>TODO PHARMA AI is the world's first platform designed to offer intelligent, empathetic and professional advice in the beauty, pharma and medical sectors, both online and in physical stores.</p>
        <p>We have developed TODO AI, a hybrid artificial intelligence engine, trained on vertical datasets and capable of learning from the customer's domain in real time. Through a network of ultra-realistic avatars, the system takes the advice experience to a new interactive, personalized and autonomous level.</p>
        <p>In a global context in which user experience and automation become fundamental for success, TODO PHARMA AI is the technological response to the evolution of consumer behavior, today increasingly demanding, fast and digital.</p>
      </div> */}

      <div class="container">
        <div class="text-section">
          <h2>
            <i class="fas fa-eye"></i> Vision
          </h2>
          <p>
            TODO PHARMA AI is the world's first platform designed to offer
            intelligent, empathetic and professional advice in the beauty,
            pharma and medical sectors, both online and in physical stores.
          </p>
          <p>
            We have developed TODO AI, a hybrid artificial intelligence engine,
            trained on vertical datasets and capable of learning from the
            customer's domain in real time. Through a network of ultra-realistic
            avatars, the system takes the advice experience to a new
            interactive, personalized and autonomous level.
          </p>
          <p>
            In a global context in which user experience and automation become
            fundamental for success, TODO PHARMA AI is the technological
            response to the evolution of consumer behavior, today increasingly
            demanding, fast and digital.
          </p>
        </div>

        <div class="image-section">
          <img src={Eye} alt="Vision" />
        </div>
      </div>

      {/* <div className="section">
        <h2>
          <i className="fas fa-microchip"></i> Proprietary Technology
        </h2>
        <p>
          TODO AI is a modular system, based on a mixed cloud + local
          infrastructure that integrates:
        </p>

        <div className="features">
          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-user"></i> Facial Recognition
            </h3>
            <p>For analyzing skin, emotions and expressions.</p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-brain"></i> Verticalized ML
              Models
            </h3>
            <p>For the pharma, beauty and medical sectors.</p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-sync-alt"></i> Dynamic Training
            </h3>
            <p>
              Each installation learns from products, contents and user
              behavior.
            </p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-comments"></i> Advanced NLP
            </h3>
            <p>With guided, natural and contextual dialogues.</p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-code"></i> Adaptive Semantic
              Engine
            </h3>
            <p>
              Continuously evolving thanks to the data collected (GDPR
              compliant).
            </p>
          </div>
        </div>

        <p className="feature-summary">
          Each customer can train their AI assistant directly from a no-code
          dashboard, simply by posting texts, descriptions and relevant
          information. The system automatically generates a personalized dataset
          and updates the answers in real time.
        </p>
      </div> */}

      <div className="feature-main">
        <p className="feature-main-heading">Proprietary technology</p>
        <div className="features-container">
          <div className="features-scroll" ref={scrollRef}>
            <div className="feature">
              <h3>
                <i className="feature-icon fas fa-user"></i> Facial Recognition
              </h3>
              <p>For analyzing skin, emotions and expression s.</p>
            </div>
            <div className="feature">
              <h3>
                <i className="feature-icon fas fa-brain"></i> Verticalized ML
                Models
              </h3>
              <p>For the pharma, beauty and medical sectors.</p>
            </div>
            <div className="feature">
              <h3>
                <i className="feature-icon fas fa-sync-alt"></i> Dynamic
                Training
              </h3>
              <p>
                Each installation learns from products, contents and user
                behavior.
              </p>
            </div>
            <div className="feature">
              <h3>
                <i className="feature-icon fas fa-comments"></i> Advanced NLP
              </h3>
              <p>With guided, natural and contextual dialogues.</p>
            </div>
            <div className="feature">
              <h3>
                <i className="feature-icon fas fa-code"></i> Adaptive Semantic
                Engine
              </h3>
              <p>
                Continuously evolving thanks to the data collected (GDPR
                compliant).
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="section">
        <h2>
          <i className="fas fa-cube"></i> The SaaS Platform
        </h2>
        <p>
          TODO PHARMA AI is available in SaaS mode, with access to modules and
          APIs via monthly subscription.
        </p>

        <div className="tech-grid">
          <div className="tech-item">
            <i className="fas fa-tachometer-alt"></i>
            <h3>Intelligent Dashboard</h3>
            <p>Avatar management, analytics and training</p>
          </div>

          <div className="tech-item">
            <i className="fab fa-wordpress"></i>
            <h3>WordPress Plugin</h3>
            <p>Seamless integration with WordPress sites</p>
          </div>

          <div className="tech-item">
            <i className="fab fa-shopify"></i>
            <h3>Shopify Plugin</h3>
            <p>E-commerce integration for Shopify stores</p>
          </div>

          <div className="tech-item">
            <i className="fas fa-code"></i>
            <h3>API + SDK Access</h3>
            <p>For developers and system integrators</p>
          </div>

          <div className="tech-item">
            <i className="fas fa-mobile-alt"></i>
            <h3>Development Kit</h3>
            <p>For mobile apps (iOS/Android) and custom web apps</p>
          </div>
        </div>

        <p className="platform-summary">
          The entire ecosystem has been built to be extremely flexible and
          integrable, suitable for both large enterprise groups and highly
          specialized local entities.
        </p>
      </div> */}

      <div className="saas-container">
        {/* LEFT IMAGE */}
        <div className="saas-image">
          <img src={Programming} alt="SaaS Platform" />
        </div>

        {/* RIGHT CONTENT */}
        <div className="saas-content">
          <h2>
            <i className="fas fa-cube"></i> The SaaS Platform
          </h2>
          <p>
            TODO PHARMA AI is available in SaaS mode, with access to modules and
            APIs via monthly subscription.
          </p>

          <div className="tech-grid">
            <div className="tech-item">
              <i className="fas fa-tachometer-alt"></i>
              <h3>Intelligent Dashboard</h3>
              <p>Avatar management, analytics and training</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-wordpress"></i>
              <h3>WordPress Plugin</h3>
              <p>Seamless integration with WordPress sites</p>
            </div>
            <div className="tech-item">
              <i className="fab fa-shopify"></i>
              <h3>Shopify Plugin</h3>
              <p>E-commerce integration for Shopify stores</p>
            </div>
            <div className="tech-item">
              <i className="fas fa-code"></i>
              <h3>API + SDK Access</h3>
              <p>For developers and system integrators</p>
            </div>
            <div className="tech-item">
              <i className="fas fa-code"></i>
              <h3>Android Development Kit</h3>
              <p>For Android apps and custom web apps</p>
            </div>
            <div className="tech-item">
              <i className="fas fa-code"></i>
              <h3>iOS Development Kit</h3>
              <p>For iOS apps and custom web apps</p>
            </div>
          </div>

          {/* <p className="platform-summary">
            The entire ecosystem has been built to be extremely flexible and
            integrable, suitable for both large enterprise groups and highly
            specialized local entities.
          </p> */}
        </div>
      </div>

      {/* <div className="section">
        <h2>
          <i className="fas fa-user-circle"></i> Ultra-Realistic Virtual Avatars
        </h2>
        <p>
          TODO AI's intelligent assistants are interactive digital avatars
          designed to simulate real human conversation, with natural voices,
          lifelike expressions and deep contextual understanding.
        </p>

        <div className="features">
          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-user-friends"></i> Customizable
              Appearance
            </h3>
            <p>
              Choose your avatar's ethnicity, age, and gender to match your
              brand identity.
            </p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-language"></i> Communication
              Style
            </h3>
            <p>
              Customize vocabulary, tone, and communication style for your
              target audience.
            </p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-briefcase-medical"></i>{" "}
              Specialized Categories
            </h3>
            <p>
              Select from beauty expert, mental coach, pharmacist, or medical
              consultant.
            </p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-portrait"></i> Brand
              Customization
            </h3>
            <p>
              Activate a customized version with your face or brand for complete
              personalization.
            </p>
          </div>
        </div>
      </div> */}

      {/* <div className="avatar-section">
        <h2 className="avatar-heading">
          <i className="fas fa-user-circle"></i> Ultra-Realistic Virtual Avatars
        </h2>
        <p className="avatar-description">
          TODO AI's intelligent assistants are interactive digital avatars
          designed to simulate real human conversation, with natural voices,
          lifelike expressions and deep contextual understanding.
        </p>

        <div className="avatar-container">
          <div className="avatar-points">
            <ul>
              <li>
                <i className="fas fa-user-friends"></i>
                Customizable Appearance – Choose your avatar's ethnicity, age,
                and gender.
              </li>
              <li>
                <i className="fas fa-language"></i>
                Communication Style – Customize vocabulary, tone and style.
              </li>
              <li>
                <i className="fas fa-briefcase-medical"></i>
                Specialized Categories – Beauty expert, mental coach,
                pharmacist, medical consultant.
              </li>
              <li>
                <i className="fas fa-portrait"></i>
                Brand Customization – Activate a customized version with your
                face or brand.
              </li>
            </ul>
          </div>

          <div className="avatar-image">
            <img src={Avatar} alt="Ultra Realistic Avatar" />
          </div>
        </div>
      </div> */}

      <div className="avatar-section">
        <h2 className="avatar-heading">
          <i className="fas fa-user-circle"></i> Ultra Realistic Avatars
        </h2>
        <p className="avatar-description">
          Customize appearance, communication style, and specialization to match
          your brand perfectly.
        </p>

        <div className="avatar-new-container">
          {/* Left cards */}
          <div className="avatar-features">
            <div className="feature-card">
              <i className="fas fa-user-friends"></i>
              <h3>Customizable Appearance</h3>
              <p>Choose your avatar's ethnicity, age, and gender.</p>
            </div>

            <div className="feature-card">
              <i className="fas fa-language"></i>
              <h3>Communication Style</h3>
              <p>Customize vocabulary, tone and style.</p>
            </div>

            <div className="feature-card">
              <i className="fas fa-briefcase-medical"></i>
              <h3>Specialized Categories</h3>
              <p>
                Beauty expert, mental coach, pharmacist, medical consultant.
              </p>
            </div>

            <div className="feature-card">
              <i className="fas fa-portrait"></i>
              <h3>Brand Customization</h3>
              <p>Activate a customized version with your face or brand.</p>
            </div>
          </div>

          {/* Right image */}
          <div className="avatar-new-image">
            <img src={Avatar} alt="Ultra Realistic Avatar" />
          </div>
        </div>
      </div>

      <div className="section">
        <h2>
          <i className="fas fa-store"></i> Physical Solutions for Retail and
          Healthcare
        </h2>
        <p>
          TODO PHARMA AI is already present in the physical world with solutions
          designed for various environments:
        </p>

        <div className="features">
          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-compress-arrows-alt"></i>{" "}
              Interactive Totems
            </h3>
            <p>
              Life-size interactive displays based on Unreal Engine 5
              technology.
            </p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-desktop"></i> Windows/Mac
              Installations
            </h3>
            <p>
              Software for screens with touch or voice command capabilities.
            </p>
          </div>

          <div className="feature">
            <h3>
              <i className="feature-icon fas fa-server"></i> Local Licenses
            </h3>
            <p>
              Completely offline or protected solutions for sensitive
              environments.
            </p>
          </div>
        </div>

        <h3 className="use-case-title">Real Use Cases:</h3>

        <div className="target-list">
          <div className="target-item">
            <i className="fas fa-hospital"></i>
            <span>
              Hospitals and clinics: Medical Consultant guides patients through
              facilities
            </span>
          </div>

          <div className="target-item">
            <i className="fas fa-pills"></i>
            <span>
              Pharmacies: Pharmacist Consultant helps find products and makes
              recommendations
            </span>
          </div>

          <div className="target-item">
            <i className="fas fa-spa"></i>
            <span>
              Beauty centers, SPAs, salons: Beauty Consultant receives customers
              and offers targeted treatments
            </span>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>
          <i className="fas fa-chart-line"></i> Market Data and Trends
        </h2>

        <div className="market-data">
          <div className="data-item">
            <div className="number">$200B+</div>
            <div className="description">
              AI market in health and pharma by 2030
            </div>
            <p className="source">Grand View Research</p>
          </div>

          <div className="data-item">
            <div className="number">35%</div>
            <div className="description">
              Increase in conversion rates with conversational AI
            </div>
            <p className="source">Gartner</p>
          </div>

          <div className="data-item">
            <div className="number">78%</div>
            <div className="description">
              Consumers prefer personalized digital interactions
            </div>
            <p className="source">McKinsey</p>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>
          <i className="fas fa-bullseye"></i> Target Market
        </h2>
        <p>
          TODO PHARMA AI is designed for a wide range of businesses in the
          health and wellness sectors:
        </p>

        <div className="target-list">
          <div className="target-item">
            <i className="fas fa-check-circle"></i>
            <span>Pharmacies and parapharmacies</span>
          </div>

          <div className="target-item">
            <i className="fas fa-check-circle"></i>
            <span>
              E-commerce of beauty, health, nutraceutical and medical products
            </span>
          </div>

          <div className="target-item">
            <i className="fas fa-check-circle"></i>
            <span>Private clinics, hospitals, medical practices</span>
          </div>

          <div className="target-item">
            <i className="fas fa-check-circle"></i>
            <span>Beauty centers, hairdressers, SPAs</span>
          </div>

          <div className="target-item">
            <i className="fas fa-check-circle"></i>
            <span>Vertical marketplaces and franchising groups</span>
          </div>

          <div className="target-item">
            <i className="fas fa-check-circle"></i>
            <span>Healthtech and beautytech start-ups</span>
          </div>
        </div>
      </div>

      {/* <div className="section">
        <h2>
          <i className="fas fa-road"></i> Roadmap & Next Goals
        </h2>

        <div className="roadmap">
          <div className="roadmap-item">
            <div className="roadmap-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="roadmap-content">
              <h3>Completed Modules</h3>
              <p>
                All modules completed and in distribution (web, mobile, desktop,
                physical)
              </p>
            </div>
          </div>

          <div className="roadmap-item">
            <div className="roadmap-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="roadmap-content">
              <h3>Plugin Availability</h3>
              <p>WordPress and Shopify plugins active on the market</p>
            </div>
          </div>

          <div className="roadmap-item">
            <div className="roadmap-icon">
              <i className="fas fa-check-circle"></i>
            </div>
            <div className="roadmap-content">
              <h3>Marketplace Integration</h3>
              <p>Present within the TODO PHARMA marketplace</p>
            </div>
          </div>

          <div className="roadmap-item">
            <div className="roadmap-icon">
              <i className="fas fa-arrow-circle-right"></i>
            </div>
            <div className="roadmap-content">
              <h3>Next Goals</h3>
              <p>
                Strengthening international distribution network, activation of
                predictive AI modules, extension to nutraceutical and wellness
                verticals, strategic growth in US, MENA and Asia markets
              </p>
            </div>
          </div>
        </div>
      </div> */}

      <div className="roadmap-section">
        {/* Left content */}
        <div className="roadmap-content-column">
          <h2>
            <i className="fas fa-road roadmap-heading"></i> Roadmap & Next Goals
          </h2>

          <div className="roadmap">
            <div className="roadmap-item">
              <div className="roadmap-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="roadmap-content">
                <h3>Completed Modules</h3>
                <p>
                  All modules completed and in distribution (web, mobile,
                  desktop, physical)
                </p>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="roadmap-content">
                <h3>Plugin Availability</h3>
                <p>WordPress and Shopify plugins active on the market</p>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-icon">
                <i className="fas fa-check-circle"></i>
              </div>
              <div className="roadmap-content">
                <h3>Marketplace Integration</h3>
                <p>Present within the TODO PHARMA marketplace</p>
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-icon">
                <i className="fas fa-arrow-circle-right"></i>
              </div>
              <div className="roadmap-content">
                <h3>Next Goals</h3>
                <p>
                  Strengthening international distribution network, activation
                  of predictive AI modules, extension to nutraceutical and
                  wellness verticals, strategic growth in US, MENA and Asia
                  markets
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right image */}
        <div className="roadmap-image-column">
          <img src={Goal} alt="Roadmap Illustration" />
        </div>
      </div>

      <div className="contact-section">
        <h2>Ready to Transform Your Business with AI?</h2>
        <p>
          TODO PHARMA AI is not a dream. It is an active, concrete platform
          ready to change the way millions of people experience beauty, pharma
          and medical consultancy.
        </p>
        <Link to="/pricing-plans" className="btn">
          Get Started Today
        </Link>
      </div>
    </div>
  );
};

export default AboutUs;
