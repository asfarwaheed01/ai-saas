import React from "react";
import "./DocsLayout.css";
import Sidebar from "../components/Documentation/DocsSidebar/DocsSidebar";

const DocsLayout = ({ children }) => {
  return (
    <div className="docs-layout">
      <Sidebar />
      <main className="docs-content">
        <div className="docs-container">{children}</div>
      </main>
    </div>
  );
};

export default DocsLayout;
