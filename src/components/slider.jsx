import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Image1 from "../assets/1.jpeg";
import Image2 from "../assets/2.jpeg";
import Image3 from "../assets/3.jpeg";
import Image4 from "../assets/4.jpeg";

const slider = () => {
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
    focusOnSelect: false,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="slider-card">
          <img src={Image1} alt="Slide 1" />
        </div>
        <div className="slider-card">
          <img src={Image2} alt="Slide 2" />
        </div>
        <div className="slider-card">
          <img src={Image3} alt="Slide 3" />
        </div>
        <div className="slider-card">
          <img src={Image4} alt="Slide 4" />
        </div>
      </Slider>
    </div>
  );
};

export default slider;
