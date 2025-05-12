// import React from "react";

// const Card = ({
//   imagePosition = "left",
//   imageUrl,
//   title,
//   description = "",
//   icon = null,
//   buttonLabel = "Learn More",
//   bullets = [],
//   innerBackground = "pink",
// }) => {
//   return (
//     <div className={`card ${imagePosition}`}>
//       <div className="card-image-wrapper">
//         <div
//           className="inner-card"
//           style={{ backgroundColor: innerBackground }}
//         >
//           <div className="image-overlay">
//             <img src={imageUrl} alt={title} />
//           </div>
//         </div>
//       </div>
//       <div className="card-content">
//         <div className="content-wrapper">
//           <button className=" button-small-card">
//             <span className="button-text">{buttonLabel}</span>
//           </button>
//           <h3>{title}</h3>
//           <ul className="card-bullets">
//             {bullets.map((bullet, index) => (
//               <li key={index}>
//                 <span className="bullet-icon">{bullet.icon}</span>
//                 <span>{bullet.text}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Card;

import React from "react";
import { IoIosArrowRoundForward } from "react-icons/io";

const Card = ({
  imagePosition = "left",
  imageUrl,
  title,
  buttonLabel = "Learn More",
  // Props for bullet version
  bullets = [],
  // Props for description version
  description = "",
  topIcon = null,
  // Variant control
  variant = "bullets", // 'bullets' or 'description'
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
          {/* Top element - button for bullets variant, icon for description variant */}
          {variant === "bullets" ? (
            <button className="button-small-card">
              <span className="button-text">{buttonLabel}</span>
            </button>
          ) : (
            topIcon && <div className="card-top-icon">{topIcon}</div>
          )}

          <h3 className="card-title-font">{title}</h3>

          {/* Content area - bullets or description */}
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

          {/* Bottom button - only for description variant */}
          {variant === "description" && (
            <button className="button button-medium">
              <span className="button-text">{buttonLabel}</span>
              <span className="arrow-icon">
                <IoIosArrowRoundForward />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
