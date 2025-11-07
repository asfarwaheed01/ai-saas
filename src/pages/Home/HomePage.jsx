import React, { useCallback, useEffect, useState } from "react";
import Slider2 from "../../components/carousel";
import { FaCheckCircle } from "react-icons/fa";
import Card from "../../components/card";
import { IoIosArrowRoundForward } from "react-icons/io";
// import Test from "../../image/test.jpg";
import Image1 from "../../assets/1.jpeg";
import Image2 from "../../assets/2.jpeg";
// import Image3 from "../../assets/3.png";
import Image4 from "../../assets/4.jpeg";
import Image5 from "../../assets/african.png";
import Image6 from "../../assets/shawn.png";
import Slider from "../../components/slider";
import TryOurAvatars from "../../components/HomePage/TryOurAvatars";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthContext";
import { backendURL } from "../../config/constants";

const HomePage = () => {
  const navigate = useNavigate();
  const [hasApiKey, setHasApiKey] = useState(false);
  const { getAccessToken, logout } = useAuth();

  const fetchApiKeyStatus = useCallback(async () => {
    try {
      const response = await fetch(`${backendURL}/users/api-keys/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getAccessToken()}`,
        },
      });

      if (response.status === 401) {
        logout();
        setHasApiKey(false);
        return;
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setHasApiKey(!!data.has_api_key); // true if user has key
    } catch (err) {
      console.error("Error checking API key:", err);
    }
  }, [getAccessToken, logout]);

  useEffect(() => {
    fetchApiKeyStatus();
  }, [fetchApiKeyStatus]);

  const handleClick = () => {
    if (!hasApiKey) {
      navigate("/docs/api-keys");
    }
  };

  return (
    <>
      <section>
        <div className="background">
          <div className="container-medium">
            <h1 className="heading-xlarge">
              AI <span>that transforms the Future of </span>
              <span className="text-highlight-gradient">Health</span>,{" "}
              <span className="text-highlight-gradient">Beauty </span>
              and <span className="text-highlight-gradient">Wellness</span>
              {/* Create studio-quality videos with realistic talking{" "}
              <span className="text-highlight-gradient">AI avatars.</span> */}
            </h1>
          </div>
          <div className="container-small">
            <p className="small-text">
              {/* TODO AI is redefining health, beauty, and wellness with
              intelligent, personalized, and empathetic solutions powered by
              advanced artificial intelligence for global impact and growth. */}
              TODO AI is revolutionizing how we experience healthcare, beauty,
              and wellness with intelligent, personalized, and empathetic
              solutions powered by cutting-edge artificial intelligence.
            </p>
          </div>
          <div className="button-center">
            <Link to="/services">
              <button className="button button-large">
                <span className="button-text">Get started for FREE</span>
                <span className="arrow-icon">
                  <IoIosArrowRoundForward />
                </span>
              </button>
            </Link>
          </div>
          <div className="slider-space">
            <Slider />
          </div>
        </div>
      </section>
      <section className="background-2">
        <div className="container-small">
          <div className="button-center">
            <button className="feature-button-Ai-Avatar button-small">
              <span className="button-text">AI AVATARS</span>
            </button>
          </div>
          <h1 className="heading-xlarge-section2">
            {/* Redefining Customer Experience with Ultra-Realistic Virtual Avatars */}
            A new customer experience through ultra-realistic virtual avatars
          </h1>
        </div>
        <div className="container-small">
          <p className="extra-small-text">
            {/* TODO AI combines ultra-realistic avatars, advanced facial
            recognition, and NLP-driven conversations to deliver personalized,
            empathetic interactions. With no-code training, SaaS modules, and
            real-time learning, businesses can easily adapt the AI to their
            domain. From clinics and pharmacies to beauty centers, our platform
            brings intelligent, human-like consultants to both digital and
            physical worlds. */}
            A new customer experience through ultra-realistic virtual avatars
            TODO AI blends hyper-realistic avatars, advanced facial recognition,
            and conversational AI to enable highly personalized and empathetic
            interactions. Thanks to a no-code interface, SaaS modules, and
            continuous learning, businesses can fully adapt the assistant to
            their sector. From e-commerce platforms to pharmacies, clinics, and
            beauty centers, our solution brings intelligent digital consultants
            into both physical and digital environments.
          </p>
        </div>
        <section className="container-xlarge">
          <Card
            imagePosition="left"
            innerBackground="lightblue"
            imageUrl={Image6}
            buttonLabel="OUR AVATARS"
            title="Two types of avatars for every environment"
            bullets={[
              {
                // icon: <FaCheckCircle />,
                text: "TODO AI offers two distinct avatar solutions designed to fit both digital and physical contexts.",
              },
              {
                // icon: <FaCheckCircle />,
                text: "Cloud Avatars (for e-commerce and digital platforms): Tailored for online stores and mobile applications in the Beauty and Pharma sectors. These avatars are installed directly on the client’s domain via API or plugins for CMS platforms such as Shopify and WordPress.",
              },
              {
                // icon: <FaCheckCircle />,
                text: "The AI learns autonomously by combining vertical machine learning models with real user interactions, continuously adapting to the language and context of each brand.",
              },
              {
                // icon: <FaCheckCircle />,
                text: "Local Avatars (for physical stores and professional environments): Designed for pharmacies, beauty centers, clinics, and medical offices, these avatars act as digital consultants in-store.",
              },
              {
                // icon: <FaCheckCircle />,
                text: "Training is manual and simple — professionals can upload their own texts and information directly into the system, and the AI automatically learns from the provided content.",
              },
              {
                // icon: <FaCheckCircle />,
                text: "Installation takes place through our Windows application, which can run on a computer or interactive totem inside the store.",
              },
            ]}
          />

          {/* Image on right */}
          <Card
            imagePosition="right"
            innerBackground="lightblue"
            imageUrl={Image1}
            buttonLabel="PHARMA AI SOLUTION"
            title="Vision"
            description="TODO AI is the world’s first platform offering intelligent, empathetic, and professional advice in the beauty, pharma, and medical sectors."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Hybrid AI engine trained on vertical datasets",
              },
              {
                icon: <FaCheckCircle />,
                text: "Learns from the customer’s domain in real time",
              },
              {
                icon: <FaCheckCircle />,
                text: "Delivers advice through ultra-realistic avatars",
              },
              {
                icon: <FaCheckCircle />,
                text: "Creates interactive, personalized, and autonomous experiences",
              },
              {
                icon: <FaCheckCircle />,
                text: "Meets growing demand for fast and digital user experiences",
              },
            ]}
          />
          <Card
            imageUrl={Image2}
            title="Proprietary Technology"
            buttonLabel="AI POWERED ENGINE"
            description="TODO AI is a modular system built on mixed cloud + local infrastructure, integrating advanced AI technologies for the pharma, beauty, and medical sectors."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Facial recognition for analyzing skin, emotions, and expressions",
              },
              {
                icon: <FaCheckCircle />,
                text: "Machine learning models for pharma, beauty, and medical domains",
              },
              {
                icon: <FaCheckCircle />,
                text: "Dynamic training that learns from products, content, and user behavior",
              },
              {
                icon: <FaCheckCircle />,
                text: "Advanced NLP for natural, guided, and contextual dialogues",
              },
              {
                icon: <FaCheckCircle />,
                text: "Adaptive semantic engine evolving with GDPR-compliant data",
              },
              {
                icon: <FaCheckCircle />,
                text: "No-code dashboard for training and updating AI assistants in real time",
              },
            ]}
          />
          <Card
            imagePosition="right"
            innerBackground="lightblue"
            buttonLabel="SUBSCRIPTION ACCESS"
            imageUrl={Image5}
            title="SaaS Platform"
            description="TODO AI is offered in SaaS mode with flexible monthly subscriptions, providing access to powerful modules and APIs."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Intelligent control panel with avatar management, analytics, and training",
              },
              {
                icon: <FaCheckCircle />,
                text: "Full API + SDK access for developers and system integrators",
              },
              {
                icon: <FaCheckCircle />,
                text: "Official plugins available for WordPress and Shopify",
              },
              {
                icon: <FaCheckCircle />,
                text: "Development kit for mobile apps (iOS/Android) and custom web apps",
              },
            ]}
          />
          <Card
            imageUrl={Image4}
            title="Ultra-Realistic Virtual Avatars"
            buttonLabel="CUSTOM AVATARS"
            description="TODO AI’s intelligent assistants are lifelike digital avatars with natural voices, expressions, and deep contextual understanding."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Choose avatar ethnicity, age, and gender",
              },
              {
                icon: <FaCheckCircle />,
                text: "Customize vocabulary, tone, and communication style",
              },
              {
                icon: <FaCheckCircle />,
                text: "Select from roles like beauty expert, mental coach, pharmacist, or medical consultant",
              },
              {
                icon: <FaCheckCircle />,
                text: "Activate a personalized version with your face or brand",
              },
            ]}
          />
        </section>
      </section>
      <section>
        <div className="background-3">
          <div className="container-medium">
            <div className="button-center">
              <button className="feature-button button-small">
                <span className="button-text">FEATURES</span>
              </button>
            </div>
            <h1 className="heading-xlarge-section2">
              Add the{" "}
              <span className="text-highlight-gradient">human touch</span> your
              content deserves with AI Avatars
            </h1>
          </div>
          <div className="container-small">
            <p className="extra-small-text">
              Create studio-quality videos with AI avatars and voiceovers in
              140+ languages. It’s as easy as making a slide deck.
            </p>
          </div>
        </div>
        <div className="container-xlarge">
          <Card
            imageUrl={Image1}
            // title="Intelligent Contextual Interaction"
            title="Smart, contextual interactions that guide every customer journey"
            buttonLabel="Smart Assistant"
            // description="TODO AI’s contextual engine analyzes the user’s face to detect skin type, visible signs, and imperfections, then suggests personalized products such as skincare, medical solutions, or supplements. By understanding habits and preferences through natural dialogue, the assistant accompanies users throughout the entire purchasing journey, boosting both satisfaction and conversion. Every interaction is processed by the NLP engine to continuously optimize responses, improve performance, and fine-tune the assistant’s tone."
            description="The TODO AI contextual engine analyzes the user’s face to detect skin type, visible
conditions, or imperfections, and recommends tailored products such as skincare, medical
solutions, or supplements. Through natural conversations, the assistant learns user habits
and preferences and supports them throughout the buying journey. Each interaction is used
to improve the assistant’s tone, performance, and relevance in real time.
"
            topIcon={<FaCheckCircle />}
            variant="description"
            innerBackground="lightblue"
          />
          <Card
            imageUrl={Image2}
            imagePosition="right"
            // title="AI Avatars in the Physical World"
            title="AI avatars that go beyond the screen"
            buttonLabel="REAL USE CASES"
            // description="TODO AI extends beyond digital platforms into the physical world. Our avatars can be installed in stores, pharmacies, clinics, and beauty centers through interactive life-size totems powered by Unreal Engine 5, or on Windows/Mac screens with touch and voice interaction. Local licenses also support fully offline and protected solutions. Real-world use cases include hospitals and clinics, where the Medical Consultant guides patients through facilities; pharmacies, where the Pharmacist Consultant assists with product recommendations; and beauty centers or spas, where the Beauty Consultant welcomes customers and suggests tailored treatments."
            description={
              <>
                TODO AI bridges digital and physical touchpoints. Our avatars
                can be deployed in pharmacies, clinics, stores, and beauty
                centers through life-size interactive totems or on Windows/Mac
                devices with touch or voice interaction. Offline and private
                license options are also available.
                <br />
                <strong>Real-world use cases include:</strong>
                <br />
                Medical consultants guiding patients in hospitals or clinics
                <br />
                Virtual pharmacists assisting with product selection
                <br />
                Beauty consultants welcoming clients and recommending
                personalized treatments
              </>
            }
            topIcon={<FaCheckCircle />}
            variant="description"
            innerBackground="pink"
          />
          <Card
            imageUrl={Image6}
            // title="No-Code Personalized Training"
            title="Personalization made easy, no code required"
            buttonLabel="TRAIN YOUR AI"
            // description="At the core of TODO AI’s flexibility is a powerful no-code training dashboard that makes personalization simple and accessible. Businesses can paste texts, upload descriptions, or import relevant information, and the system automatically generates a structured dataset that adapts to their specific domain. Content can be organized by topic, category, or priority, while the AI continuously learns and fine-tunes responses to match the company’s language, customers, and market. For premium users, we even enable the creation of a fully personalized avatar that replicates the professional’s own face and voice."
            description={
              <>
                At the heart of <strong>TODO AI</strong> lies a powerful{" "}
                <strong>no-code training dashboard</strong> that allows avatars
                to be trained easily and comprehensively, both for the Cloud and
                Local versions.
                <br />
                <br />
                <strong>Cloud Learning</strong> (for e-commerce and digital
                platforms)
                <br />
                Avatars installed on websites and mobile applications learn
                autonomously from the domain and from real user interactions.
                Through our vertical machine learning models, the AI analyzes
                language, tone, and audience behavior to progressively adapt to
                each brand’s context and continuously improve its responses.
                Every interaction helps make the assistant increasingly
                accurate, empathetic, and consistent with the company’s
                identity.
                <br />
                <br />
                <strong>Local Learning</strong> (for physical stores and
                professional environments)
                <br />
                Avatars installed in pharmacies, beauty centers, clinics, and
                medical offices are trained manually through the no-code
                dashboard. Professionals can upload texts, descriptions, or
                documents, and the system automatically converts them into a
                structured, learning-ready dataset. Content can be organized by
                topic, category, or priority, allowing for fast, controlled, and
                fully customizable training.
                <br />
                <br />
                <strong>Real-world use cases include:</strong>
                <br />
                Medical consultants guiding patients in hospitals or clinics
                <br />
                Virtual pharmacists assisting with product selection
                <br />
                Beauty consultants welcoming clients and recommending
                personalized treatments
              </>
            }
            topIcon={<FaCheckCircle />}
            variant="description"
            innerBackground="lightblue"
          />
        </div>
      </section>

      <TryOurAvatars />

      <section className="container-xlarge space-top">
        <div className="background-4">
          <div className="button-center">
            <button className="feature-button button-small">
              <span className="button-text">CUSTOM AVATARS</span>
            </button>
          </div>
          <h1 className="heading-xlarge-section4">
            How to create your own AI avatar
          </h1>
          <div className="container-small">
            <p className="ex-small-text">
              Here’s how to generate a lifelike digital assistant tailored to
              you or your brand.
            </p>
          </div>

          <div
            className="two-column-layout"
            style={{ display: "flex", marginTop: "40px" }}
          >
            {/* Content Column - 35% width */}
            <div
              className="content-column"
              style={{ width: "35%", paddingRight: "40px" }}
            >
              {[
                {
                  heading: "Choose Your Avatar",
                  description:
                    "Select the ethnicity, age, gender, and role of your avatar — from beauty expert and medical consultant to mental coach or pharmacist.",
                },
                {
                  heading: "Customize Style & Personality",
                  description:
                    "Define vocabulary, tone, and communication style. Adjust how your avatar looks, sounds, and interacts for a truly personalized experience.",
                },
                {
                  heading: "Train With Your Content",
                  description:
                    "Use the no-code dashboard to upload texts, descriptions, or business information. The system automatically creates a dataset and adapts to your language and market.",
                },
                {
                  heading: "Activate Your Avatar",
                  description:
                    "Deploy your personalized AI assistant with your own face, your brand, or a custom identity — ready to engage users in real time.",
                },
              ].map((step, index) => (
                <div key={index} style={{ marginBottom: "30px" }}>
                  <h3
                    style={{
                      fontSize: "22px",
                      fontWeight: "600",
                      marginBottom: "8px",
                    }}
                  >
                    {step.heading}
                  </h3>
                  <p
                    style={{
                      fontSize: "19px",
                      lineHeight: "1.5",
                      color: "lightblue",
                    }}
                  >
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Image Column - 65% width */}
            <div className="image-column" style={{ width: "65%" }}>
              <img
                src={Image4}
                alt="AI Avatar creation"
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  objectFit: "cover",
                  maxHeight: "500px", // Adjust as needed
                }}
              />
            </div>
          </div>
        </div>
      </section>
      <section className="space-top container-xlarge">
        <button className="button-small-card">
          <span className="button-text">ENTERPRISE READY</span>
        </button>
        <div className="two-column-wrapper">
          {/* First Column - Heading */}
          <div className="column-left">
            <h2 className="column-heading">
              {/* Built on the foundations of AI ethics and security */}
              Built on ethics, privacy, and security
            </h2>
          </div>

          {/* Second Column - Description + Button */}
          <div className="column-right">
            <p className="column-description">
              {/* People first, always. TODO AI is designed for secure, ethical, and
              GDPR-compliant use of artificial intelligence in health, beauty,
              and wellness. */}
              TODO AI is developed with strict ethical and privacy-first
              principles, ensuring secure and GDPR-compliant AI applications in
              the healthcare, beauty, and wellness industries.
            </p>
            {/* <button className="button button-medium button-sec4">
              <span className="button-text">Learn more</span>
              <span className="arrow-icon">
                <IoIosArrowRoundForward />
              </span>
            </button> */}
          </div>
        </div>

        <div className="quad-card-grid space-top">
          {/* Card 1 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">📊</div>
                <h3 className="card-title-text">Control Panel</h3>
              </div>
              <p className="card-desc-text">
                Manage avatars, training, and analytics through an intelligent
                dashboard
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">⚙️</div>
                <h3 className="card-title-text">No-Code Training</h3>
              </div>
              <p className="card-desc-text">
                Easily customize vocabulary, tone, and datasets without
                technical skills.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">🔒</div>
                <h3 className="card-title-text">Security & Compliance</h3>
              </div>
              <p className="card-desc-text">
                Hybrid cloud + local infrastructure with enterprise-grade data
                protection.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">🌐</div>
                <h3 className="card-title-text">Integrations</h3>
              </div>
              <p className="card-desc-text">
                Seamlessly connect with WordPress, Shopify, mobile apps, and
                custom platforms.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="container-xlarge">
        <div className="conatiner-xsm">
          <button className="button-small-card">
            <span className="button-text">USE CASES</span>
          </button>
          <h1 className="heading-xlarge-section5">
            Hospitals, pharmacies, and beauty centers use TODO AI to boost
            engagement and deliver personalized care.
          </h1>
        </div>
      </section>
      <section className="container-xlarge">
        <div className="slider-space">
          <Slider2 />
        </div>
      </section>
      {/* <section className="live-api-section container-xlarge">
        <h2 className="api-heading">Developer's API</h2>

        <div
          className="api-box"
          onClick={() => navigate("/docs/getting-started")}
        >
          <div className="api-code">https://saas.todopharma.com/</div>
          <div className="tooltip">Access Developer API →</div>
        </div>
      </section> */}
      <section className="live-api-section container-xlarge">
        <h2 className="api-heading">Developer API</h2>

        <div
          className="api-box"
          onClick={handleClick}
          // onClick={() => navigate("/docs/getting-started")}
          // onClick={() => navigate("/docs/api-keys")}
        >
          <pre className="api-code">
            {`const url = https://saas.todopharma.com/
  {
    auth: {
      token: 'your_api_key_here'
    },
  }
`}
          </pre>
          {/* <div className="tooltip">Access Developer API </div> */}
          {!hasApiKey && <div className="tooltip">Access Developer API</div>}
        </div>
      </section>
    </>
  );
};

export default HomePage;
