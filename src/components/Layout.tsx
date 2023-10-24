import React from "react";
import { Outlet } from "react-router-dom";
import CustomNavbar from "./Navbar";
import SidNav from "./SidNav";

export const Layout = () => {
  const handleSelect = (eventKey: string) => {
    return eventKey;
  };
  return (
    <>
      <CustomNavbar onSelect={handleSelect} activeKey="1" />
      <div style={{ display: "flex", flexGrow: 1, gap: "14px" }}>
        <div
          style={{ maxWidth: "56px", zIndex: 10, order: 1, direction: "rtl" }}
          className="d-none d-md-block sidebar"
        >
          <SidNav />
        </div>
        <Outlet />
      </div>
    </>
  );
};
export default Layout;
