import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { RiMenu2Fill } from "react-icons/ri";
import "./Sidebar.scss";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { CgAddR } from "react-icons/cg";
import { BiSearchAlt2 } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineAccountCircle } from "react-icons/md";
// import Suggested from "../../utils/Suggested";
import Discover from "../../utils/Discover";
import { useEffect } from "react";
import { getAllUsers } from "../../Actions/UserAction";
import User from "../User/User";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div id="Sidebar">
      <div className="sidebar">
        <div
          className="sidebar-div"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <MdClose className="text-red-200" /> : <RiMenu2Fill />}
        </div>
        {showSidebar && (
          <div className="sidebar-box">
            <div>
              <div className="div-1">
                <Link to="/">
                  <div>
                    <p>
                      <FiHome />
                    </p>
                    <p>For You</p>
                  </div>
                </Link>
              </div>
              <div className="div-2">
                <Link to="/search">
                  <BiSearchAlt2 />
                  <p>Search</p>
                </Link>
                <Link to="/newpost">
                  <CgAddR />
                  <p>New Post</p>
                </Link>
                <Link to="/account">
                  <MdOutlineAccountCircle />
                  <p>Account</p>
                </Link>
              </div>
              <Discover className="discover" />
              {/* <Suggested />
              <Footer /> */}

              <p
                style={{
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                All Users
              </p>
              {users &&
                users.map((user) => (
                  <User
                    key={user._id}
                    userId={user._id}
                    name={user.name}
                    avatar={user.avatar.url}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
