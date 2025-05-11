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
        <div className="container-medium">
          <div className="button-center">
            <button className="feature-button button-small">
              <span className="button-text">FEATURES</span>
            </button>
          </div>
          <h1 className="heading-xlarge-section2">
            Add the <span className="text-highlight-gradient">human touch</span>{" "}
            your content deserves with AI Avatars
          </h1>
        </div>
        <div className="container-small">
          <p className="extra-small-text">
            Create studio-quality videos with AI avatars and voiceovers in 140+
            languages. It’s as easy as making a slide deck.
          </p>
        </div>
      </section>
    </>
  );
}

export default App;
