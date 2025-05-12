import React from "react";
import Navbar from "../components/navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content">{children}</div>
    </>
  );
};

export default MainLayout;
