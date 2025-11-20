// src/components/Layout.jsx
import React from "react";
import Navbar from "../Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <div className="flex">
    <Sidebar />
    <div className="flex-1 min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-6">{children}</main>
    </div>
  </div>
);

export default Layout;
