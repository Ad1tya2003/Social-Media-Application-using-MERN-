import React from "react";
import { topics } from "./Constants";
import { Link } from "react-router-dom";
import "./utils.scss";

const Discover = () => {

  // const activeStyle = {
  //   display: "flex",
  //   border: "1px solid #313bac",
  //   padding: "0.5rem 0.75rem",
  //   borderRadius: "20px",
  //   gap: "0.5rem",
  //   cursor: "pointer",
  //   justifyContent: "center",
  //   alignItems: "center",
  //   color: "#313bac",
  //   backgroundColor: "#313bac30",
  // };

  return (
    <div className="discover">
      <p>Today's Trending</p>
      <div className="discover-topic">
        {topics.map((subject) => (
          <Link to={`/subject/${subject.name}`} key={subject.name}>
            <div className="discover-subject">
              <span>{subject.icon}</span>
              <span>{subject.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
