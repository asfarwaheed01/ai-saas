import React, { useEffect, useState } from "react";
import "./DocsLayout.css";
import Sidebar from "../components/Documentation/DocsSidebar/DocsSidebar";
import { FaBars } from "react-icons/fa";

const DocsLayout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="docs-layout">
      {!isOpen && (
        <button
          className={`mobile-menu-btn ${scrolled ? "scrolled" : ""}`}
          onClick={() => setIsOpen(true)}
          aria-label="Open sidebar"
        >
          <FaBars />
        </button>
      )}
      {/* <Sidebar /> */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <main className="docs-content">
        <div className="docs-container">{children}</div>
      </main>
    </div>
  );
};

export default DocsLayout;
