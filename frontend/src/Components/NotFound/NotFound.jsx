import React from "react";
import { Link } from "react-router-dom";
import { BiErrorCircle } from "react-icons/bi";

const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        height: "90vh",
        color:"slategray"
      }}
    >
      <p
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          color:"black"
        }}
      >
        <BiErrorCircle />
      </p>
      <h1
        style={{
          fontSize: "4rem",
          border: "none",
        }}
      >
        Not Found
      </h1>
      <Link style={{
        textDecoration:"underline",
        color:"blue"
      }} to="/">Navigate to Home</Link>
    </div>
  );
};

export default NotFound;
