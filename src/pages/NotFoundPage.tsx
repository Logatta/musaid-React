import React from "react";
import NotFound from "../assets/img/NotFound.png"; // Import the SVG

const NotFoundPage: React.FC = () => {
  return (
    <main
      className="d-flex flex-column justify-content-center align-items-center flex-grow-1 mt-4 p-3"
      style={{ direction: "rtl" }}
    >
      <img
        src={NotFound}
        alt="dw"
        className=""
        style={{ width: "max(50% , 350px)" }}
      />
    </main>
  );
};

export default NotFoundPage;
