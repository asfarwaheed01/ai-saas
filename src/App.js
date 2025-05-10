import "./App.css";
import { IoIosArrowRoundForward } from "react-icons/io";
import Slider from "./components/slider";
import Navbar from "./components/navbar";

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
      </section>
    </>
  );
}

export default App;
