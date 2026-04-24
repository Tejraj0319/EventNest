// Many admin pages need same sidebar and layout.
// Instead of repeating code in every page, we make one reusable wrapper.
// children means current page content goes inside layout.
// Sidebar stays same, only right content changes.
// This is clean and scalable architecture.


import React, { Children } from "react";
import Sidebar from "./Sidebar";

const AdminLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default AdminLayout;
