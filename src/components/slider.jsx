import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

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
          <img src="/images/1.jpeg" alt="Slide 1" />
        </div>
        <div className="slider-card">
          <img src="/images/2.jpeg" alt="Slide 2" />
        </div>
        <div className="slider-card">
          <img src="/images/3.jpeg" alt="Slide 3" />
        </div>
        <div className="slider-card">
          <img src="/images/1.jpeg" alt="Slide 4" />
        </div>
      </Slider>
    </div>
  );
};

export default slider;
