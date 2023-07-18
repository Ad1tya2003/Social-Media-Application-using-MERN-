import React from "react";
import { Link } from "react-router-dom";
import { GoVerified } from "react-icons/go";
import "./User.scss";

const User = ({ userId, name, avatar }) => {
  return (
    <Link className="user" to={`/user/${userId}`}>
      <img src={avatar} alt={name} />
      <div>
        <h3>{name}</h3>
        <h4>{name}</h4>
      </div>
      <GoVerified />
    </Link>
  );
};

export default User;
