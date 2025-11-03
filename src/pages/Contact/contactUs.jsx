// import React from "react";
// import "./contact.css";

// const ContactUs = () => {
//   return (
//     <div className="contact-wrapper space-top background">
//       <div className="contact-container">
//         <h2 className="contact-title">Get in Touch</h2>
//         <p className="contact-subtitle">
//           We’d love to hear from you. Send us a message and we’ll responds as
//           soon as possible.
//         </p>

//         <form className="contact-form">
//           <div className="form-group">
//             <label>Name</label>
//             <input type="text" placeholder="Your full name" required />
//           </div>

//           <div className="form-group">
//             <label>Email</label>
//             <input type="email" placeholder="you@example.com" required />
//           </div>

//           <div className="form-group">
//             <label>Subject</label>
//             <input type="text" placeholder="Reason for reaching out" />
//           </div>

//           <div className="form-group">
//             <label>Message</label>
//             <textarea
//               rows="5"
//               placeholder="Write your message here..."
//               required
//             ></textarea>
//           </div>

//           <button type="submit" className="contact-button">
//             Send Message
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ContactUs;

import React, { useState } from "react";
import "./contact.css";
import { backendURL } from "../../config/constants";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [responseMsg, setResponseMsg] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMsg(null);

    try {
      const response = await fetch(`${backendURL}/contact/submit/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }

      setResponseMsg("✅ Message sent successfully!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Error:", error);
      setResponseMsg("❌ Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="contact-wrapper space-top background">
      <div className="contact-container">
        <h2 className="contact-title">Get in Touch</h2>
        <p className="contact-subtitle">
          We’d love to hear from you. Send us a message and we’ll respond as
          soon as possible.
        </p>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Subject</label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Reason for reaching out"
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>

          <button type="submit" className="contact-button" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {responseMsg && (
          <p
            className={`response-message ${
              responseMsg.startsWith("✅") ? "success" : "error"
            }`}
          >
            {responseMsg}
          </p>
        )}
      </div>
    </div>
  );
};

export default ContactUs;
