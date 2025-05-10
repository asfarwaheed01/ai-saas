import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Test from "../image/test.jpg";
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
  };
  return (
    <div className="carousel-container">
      <Slider {...settings}>
        <div className="slider-card">
          <img src={Test} alt="Slide 1" />
        </div>
        <div className="slider-card">
          <img src={Test} alt="Slide 2" />
        </div>
        <div className="slider-card">
          <img src={Test} alt="Slide 3" />
        </div>
        <div className="slider-card">
          <img src={Test} alt="Slide 4" />
        </div>
      </Slider>
    </div>
  );
};

export default slider;
