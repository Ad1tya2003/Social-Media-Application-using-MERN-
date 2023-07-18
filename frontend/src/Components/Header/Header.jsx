import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import { FiHome } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import { BiSearchAlt2 } from "react-icons/bi";
import { MdOutlineAccountCircle } from "react-icons/md";

const Header = () => {
  return (
    <div>
      <div className="header">
        <Link to="/">
          <div className="img-div">
            <img src="/logo.png" alt="logo" />
            <span>
              <img src="/logo2.png" alt="logo" />
            </span>
          </div>
        </Link>
        <div>
          <Link to="/">
            <FiHome className="font-bold text-3xl" />
          </Link>

          <Link to="/search">
            <BiSearchAlt2 />
          </Link>

          <Link to="/newpost">
            <CgAddR />
          </Link>

          <Link to="/account">
            <MdOutlineAccountCircle />
          </Link>
        </div>
        <div
          style={{
            fontWeight: "bold",
            padding: "0.3rem 1rem",
            border: "1px solid #b5c2d4",
            borderRadius: "7px",
            cursor: "pointer",
          }}
          className="div-hover"
        >
          <Link to="/account" className="accountLink">Logged In</Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
