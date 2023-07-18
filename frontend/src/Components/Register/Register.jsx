import React from "react";
import { useState } from "react";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { registerUser } from "../../Actions/UserAction";
import { useEffect } from "react";

const Register = () => {
  const { loading, error } = useSelector((state) => state.user);

  const [name, setName] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [avatar, setAvatar] = useState(" ");

  const dispatch = useDispatch();

  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatar(Reader.result);
      }
    };
  };

  const registerHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(email, password, name, username, avatar));
    alert.show("Welcome Sir");
  };

  useEffect(() => {
    if (error) {
      alert.show(error);
      dispatch({ type: "clearErrors" });
    }
  }, [dispatch, alert, error]);

  return (
    <div className="login-div">
      <div className="login">
        <form className="loginform" onSubmit={registerHandler}>
          <h2>Register User</h2>
          <p className="head">Please enter your details.</p>

          <p className="email">Name</p>
          <input
            type="text"
            placeholder="Enter Your Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <p className="email">UserName</p>
          <input
            type="text"
            placeholder="Enter Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <p className="email">Email</p>
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <p className="email">Password</p>
          <input
            type="password"
            placeholder="Enter Your Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div
            style={{ display: "flex", marginTop: "1rem", marginBottom: "1rem" }}
          >
            <Avatar
              src={avatar}
              alt="User"
              sx={{ height: "4vmax", width: "4vmax" }}
            />
            <input
              style={{ marginLeft: "7px", width: "100%", height: "3rem" }}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <button type="submit" disabled={loading}>
            Register
          </button>

          <Link to="/" className="signup">
            <p>
              Already have an account?{" "}
              <span style={{ color: "#1216cb" }}>Sign In</span>{" "}
            </p>
          </Link>
        </form>
      </div>
      <div className="background">
        <div>
          <img src="/login.png" alt="login" />
          <img src="/auth.png" alt="auth" />
        </div>
        <div>
          <p className="head-1">Welcome to Instagram</p>
          <p className="head-2">Sign in to explore the world!</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
