import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { IoIosArrowRoundForward } from "react-icons/io";

const Slider2 = () => {
  const settings = {
    // dots: true,
    infinite: true,
    speed: 8000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    centerMode: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Card data with manual <span> in titles
  const cardData = [
    {
      id: 1,
      image: "/images/1.jpeg",
      title: (
        <>
          <span className="text-highlight-gradient">
            Learning & Development
          </span>{" "}
          Videos that engage
        </>
      ),
      description: "Replace boring text with engaging videos",
      buttonText: "Learn More",
    },
    {
      id: 2,
      image: "/images/2.jpeg",
      title: (
        <>
          Corporate{" "}
          <span className="slider-2-gradient-text">Training Videos</span> for
          teams
        </>
      ),
      description: "Transform your training materials",
      buttonText: "View Demo",
    },
    {
      id: 3,
      image: "/images/3.jpeg",
      title: (
        <>
          Replace <span className="slider-2-gradient-text">dull content</span>{" "}
          with interactive media
        </>
      ),
      description: "Boost knowledge retention",
      buttonText: "See How",
    },
    {
      id: 4,
      image: "/images/4.jpeg",
      title: (
        <>
          No more <span className="slider-2-gradient-text">boring</span>{" "}
          training sessions
        </>
      ),
      description: "Create captivating experiences",
      buttonText: "Get Started",
    },
  ];

  return (
    <Slider {...settings}>
      {cardData.map((card) => (
        <div key={card.id}>
          <div className="slider-2-card">
            <div className="slider-2-img">
              <img src={card.image} alt={`Slide ${card.id}`} />
            </div>
            <div className="slider-2-content">
              <div className="slider-2-text-content">
                <h3 className="slider-2-title">{card.title}</h3>
                <p className="slider-2-desc">{card.description}</p>
              </div>
              {/* <button className="slider-2-btn">{card.buttonText}</button> */}
              <button className=" button-medium button-sec4 slider-2-btn">
                <span className="button-text">Learn more</span>
                <span className="arrow-icon">
                  <IoIosArrowRoundForward />
                </span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default Slider2;
