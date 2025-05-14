import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/Footer";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="main-content">{children}</div>
      <Footer />
    </>
  );
};

export default MainLayout;
