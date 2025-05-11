import "./App.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import Slider from "./components/slider";
import Navbar from "./components/navbar";
import Card from "./components/card";
import Test from "./image/test.jpg";
import { FaCheckCircle } from "react-icons/fa";

function App() {
  return (
    <>
      <Navbar />
      <section>
        <div className="background">
          <div className="container-medium">
            <h1 className="heading-xlarge">
              Create studio-quality videos with realistic talking{" "}
              <span className="text-highlight-gradient">AI avatars.</span>
            </h1>
          </div>
          <div className="container-small">
            <p className="small-text">
              Try the world’s most realistic talking AI avatars for free. Turn
              text into engaging video content for training, sales enablement,
              and marketing in any language in minutes.
            </p>
          </div>
          <div className="button-center">
            <button className="button button-large">
              <span className="button-text">Get started for FREE</span>
              <span className="arrow-icon">
                <IoIosArrowRoundForward />
              </span>
            </button>
          </div>
          <div className="slider-space">
            <Slider />
          </div>
        </div>
      </section>
      <section className="background-2">
        <div className="container-small">
          <div className="button-center">
            <button className="button button-small">
              <span className="button-text">AI AVATARS</span>
            </button>
          </div>
          <h1 className="heading-xlarge-section2">
            Choose the avatar that works for you
          </h1>
        </div>
        <div className="container-small">
          <p className="extra-small-text">
            Choose from 230+ ready-to-use stock AI avatars, generate a lifelike
            custom avatar by recording yourself with a webcam or phone, or visit
            a certified studio for a professionally produced avatar.
          </p>
        </div>
        <section className="container-xlarge">
          {/* Image on right */}
          <Card
            imagePosition="right"
            innerBackground="lightblue"
            imageUrl={Test}
            buttonLabel="EXPRESSIVE AVATARS"
            title="Ready-to-use expressive AI avatars"
            description="This card has image on right (60%) and content on left (40%)."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Choose from 230+ realistic stock AI avatars",
              },
              {
                icon: <FaCheckCircle />,
                text: "Our stock AI avatars speak 140+ languages",
              },
              {
                icon: <FaCheckCircle />,
                text: "Easily make engaging avatar videos with an intuitive editor",
              },
            ]}
          />
          <Card
            imageUrl={Test}
            title="Create a custom AI avatar of yourself"
            buttonLabel="PERSONAL AVATARS"
            description="This card has image on left (60%) and content on right (40%)."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Record yourself with a webcam or smartphone — no studio needed",
              },
              {
                icon: <FaCheckCircle />,
                text: "Record in English, German, French, or Spanish and we’ll create a copy of your voice in 29 languagest",
              },
              {
                icon: <FaCheckCircle />,
                text: "Capture your avatar standing, sitting, or walking for more dynamic videos",
              },
            ]}
          />
          <Card
            imagePosition="right"
            innerBackground="lightblue"
            buttonLabel="STUDIO AVATARS"
            imageUrl={Test}
            title="Create a studio-quality custom avatar"
            description="This card has image on right (60%) and content on left (40%)."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Work with our team to capture your avatar in a professional studio",
              },
              {
                icon: <FaCheckCircle />,
                text: "Get hyper-realistic visuals with natural gestures and expressions",
              },
              {
                icon: <FaCheckCircle />,
                text: "Perfect for polished, enterprise-grade video content",
              },
            ]}
          />
          <Card
            imageUrl={Test}
            title="Quickly create branded AI avatars at scale"
            buttonLabel="AVATAR BUILDER"
            description="This card has image on left (60%) and content on right (40%)."
            bullets={[
              {
                icon: <FaCheckCircle />,
                text: "Customize clothing and add logos to our stock avatars in minutes",
              },
              {
                icon: <FaCheckCircle />,
                text: "Keep your videos consistent and on-brand across projects",
              },
              {
                icon: <FaCheckCircle />,
                text: "Choose from 20 customizable stock avatars",
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
            imageUrl={Test}
            title="Create videos in minutes"
            buttonLabel="Get Started"
            description="Create and update avatar videos in minutes with an easy text-to-video editor, pre-built templates, and a built-in media library."
            topIcon={<FaCheckCircle />}
            variant="description"
            innerBackground="lightblue"
          />
          <Card
            imageUrl={Test}
            imagePosition="right"
            title="Speak your audience’s language"
            buttonLabel="See al languages"
            description="Connect with global audiences—our talking avatars can deliver your message in over 140 languages and accents."
            topIcon={<FaCheckCircle />}
            variant="description"
            innerBackground="pink"
          />
          <Card
            imageUrl={Test}
            title="Create videos in minutes"
            buttonLabel="Get Started"
            description="Create and update avatar videos in minutes with an easy text-to-video editor, pre-built templates, and a built-in media library."
            topIcon={<FaCheckCircle />}
            variant="description"
            innerBackground="lightblue"
          />
        </div>
      </section>
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
              Here's how to generate an AI-generated talking avatar that looks
              and sounds just like you.
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
                  heading: "Upload Your Photo",
                  description:
                    "Start by uploading a clear, well-lit headshot of yourself. The AI works best with high-quality images where your face is clearly visible.",
                },
                {
                  heading: "Customize Your Avatar",
                  description:
                    "Choose from various styles and customization options. Adjust facial features, hairstyle, and other attributes to match your preferences.",
                },
                {
                  heading: "Record Your Voice",
                  description:
                    "Provide voice samples by reading short texts. Our AI will analyze your speech patterns to create a natural-sounding voice clone.",
                },
                {
                  heading: "Generate & Download",
                  description:
                    "Our system will process your inputs and generate your personalized AI avatar. Download it in your preferred format when ready.",
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
                src={Test}
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
              Built on the foundations of AI ethics and security
            </h2>
          </div>

          {/* Second Column - Description + Button */}
          <div className="column-right">
            <p className="column-description">
              People first, always. Since 2017, we've prioritized secure, safe
              and ethical use of Artificial Intelligence.
            </p>
            <button className="button button-medium button-sec4">
              <span className="button-text">Learn more</span>
              <span className="arrow-icon">
                <IoIosArrowRoundForward />
              </span>
            </button>
          </div>
        </div>

        <div className="quad-card-grid space-top">
          {/* Card 1 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">📊</div>
                <h3 className="card-title-text">Analytics</h3>
              </div>
              <p className="card-desc-text">
                Track and analyze your performance with our advanced analytics
                dashboard.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">⚙️</div>
                <h3 className="card-title-text">Automation</h3>
              </div>
              <p className="card-desc-text">
                Streamline workflows with powerful automation tools.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">🔒</div>
                <h3 className="card-title-text">Security</h3>
              </div>
              <p className="card-desc-text">
                Enterprise-grade security to protect your data.
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="feature-card-item">
            <div className="card-content-wrapper">
              <div className="icon-title-row">
                <div className="card-icon-box">🌐</div>
                <h3 className="card-title-text">Integration</h3>
              </div>
              <p className="card-desc-text">
                Connect with all your favorite tools and services.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="conatiner-xsm">
        <button className="button-small-card">
          <span className="button-text">USE CASES</span>
        </button>
        <h1 className="heading-xlarge-section5">
          50,000+ teams use our AI avatars to save time, cut costs, and boost
          engagement
        </h1>
      </section>
      <section>
        <div className="slider-space">
          <Slider />
        </div>
      </section>
    </>
  );
}

export default App;
