import React from "react";
import Navbar from "./../Navbar/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import ScrollBtn from "../ScrollBtn/ScrollBtn";

export default function Layout() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateRows: "auto 1fr auto",
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div style={{ marginTop: "80px" }}>
        <Outlet />
      </div>
      <ScrollBtn />
      <Footer />
    </div>
  );
}
