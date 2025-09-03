import React from "react";
import "./Footer.css";
// import Logo from "../../public/images/logo.jpeg";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";
import { Link } from "react-router-dom";

const Footer = () => {
  const columnData = [
    {
      heading: "Navigation",
      items: [
        { label: "Services", url: "/services" },
        { label: "Docs", url: "/docs/getting-started" },
        { label: "Contact Us", url: "/contact-us" },
        { label: "Pricing Plans", url: "/pricing-plans" },
      ],
    },
    {
      heading: "Support",
      items: [
        {
          label: "Co-financed by the European Union",
          url: "/informativa_privacy",
        },
        { label: "Terms & Conditions", url: "#" },
      ],
    },
    {
      heading: "TODO AI",
      items: [
        { label: "VAT number: 09781131215", url: "#" },
        { label: "support@todopharma.it", url: "mailto:support@todopharma.it" },
      ],
    },
  ];

  return (
    <div className="footer-background">
      <section className="container-xmedium footer-section">
        {/* First Column (Logo & Description) */}
        <div className="footer-col footer-col-1">
          <img
            src="/images/logo todo 1.png"
            alt="Logo"
            className="footer-logo"
          />
          <p>
            Artificial Intelligence Redefining the Future of Health, Beauty and
            Wellness
          </p>
        </div>

        {/* Other Columns */}
        {columnData.map((col, index) => (
          <div className="footer-col footer-col-other" key={index}>
            <h4>{col.heading}</h4>
            <ul>
              {col.items.map((item, idx) => (
                <li key={idx}>
                  <Link to={item.url}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="container-xmedium">
        <hr></hr>
        <div className="footer-end">
          <div>{new Date().getFullYear()} Todo Ai. All rights reserved.</div>
          <div className="icons-gap">
            <FaSquareXTwitter />
            <FaLinkedin />
            <IoLogoYoutube />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
