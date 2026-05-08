import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Card = ({
  imagePosition = "left",
  imageUrl,
  title,
  buttonLabel = "Learn More",
  bullets = [],
  description = "",
  topIcon = null,
  variant = "bullets",
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
          {variant === "bullets" ? (
            <button className="button-small-card">
              <span className="button-text">{buttonLabel}</span>
            </button>
          ) : (
            topIcon && <div className="card-top-icon">{topIcon}</div>
          )}

          <h3 className="card-title-font">{title}</h3>

          {variant === "bullets" ? (
            <ul className="card-bullets">
              {bullets.map((bullet, index) => (
                <li key={index}>
                  <span className="bullet-icon">{bullet.icon}</span>
                  <span>{bullet.text}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="card-description">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
