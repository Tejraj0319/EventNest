import React from "react";
import SideBar from "./Sidebar";

const OrganizerLayout = ({ children }) => {
  return (
    <div style={{ display: "flex", gap: "20px" }}>
      <SideBar />
      <div>{children}</div>
    </div>
  );
};

export default OrganizerLayout;
