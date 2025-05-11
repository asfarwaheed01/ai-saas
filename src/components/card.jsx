import React from "react";

const Card = ({
  imagePosition = "left",
  imageUrl,
  title,
  buttonLabel = "Learn More",
  bullets = [],
  innerBackground = "pink",
}) => {
  return (
    <div className={`card ${imagePosition}`}>
      <div className="card-image-wrapper">
        <div
          className="inner-card"
          style={{ backgroundColor: innerBackground }}
        >
          <div className="image-overlay">
            <img src={imageUrl} alt={title} />
          </div>
        </div>
      </div>
      <div className="card-content">
        <div className="content-wrapper">
          <button className=" button-small-card">
            <span className="button-text">{buttonLabel}</span>
          </button>
          <h3>{title}</h3>
          <ul className="card-bullets">
            {bullets.map((bullet, index) => (
              <li key={index}>
                <span className="bullet-icon">{bullet.icon}</span>
                <span>{bullet.text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Card;
