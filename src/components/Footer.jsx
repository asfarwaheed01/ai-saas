import React from "react";
import "./Footer.css";
import Logo from "../image/logo.jpeg";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { IoLogoYoutube } from "react-icons/io";

const Footer = () => {
  const columnData = [
    {
      heading: "Company",
      items: [
        "About Us",
        "Careers",
        "Blog",
        "Press",
        "Partners",
        "Team",
        "Mission",
        "Vision",
        "Values",
        "Legal",
      ],
    },
    {
      heading: "Resources",
      items: [
        "Documentation",
        "Tutorials",
        "Community",
        "Events",
        "Webinars",
        "Newsletters",
        "Podcasts",
        "Guides",
        "Reports",
        "Updates",
      ],
    },
    {
      heading: "Support",
      items: [
        "Contact Support",
        "FAQs",
        "Live Chat",
        "System Status",
        "Feedback",
        "Help Center",
        "Tickets",
        "Account Recovery",
        "Refunds",
        "Terms",
      ],
    },
    {
      heading: "Product",
      items: [
        "Features",
        "Integrations",
        "Pricing",
        "Demos",
        "Roadmap",
        "API Access",
        "Use Cases",
        "Solutions",
        "What's New",
        "Security",
      ],
    },
  ];

  return (
    <div className="footer-background">
      <section className="container-xmedium footer-section">
        {/* First Column (Logo & Description) */}
        <div className="footer-col footer-col-1">
          <img src={Logo} alt="Logo" className="footer-logo" />
          <p>
            Our platform helps you convert knowledge into intelligent video
            experiences.
          </p>
        </div>

        {/* Other Columns */}
        {columnData.map((col, index) => (
          <div className="footer-col footer-col-other" key={index}>
            <h4>{col.heading}</h4>
            <ul>
              {col.items.map((item, idx) => (
                <li key={idx}>
                  <a href="#">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="container-xmedium">
        <hr></hr>
        <div className="footer-end">
          <div>2025 Synthesia Limited. All rights reserved.</div>
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
