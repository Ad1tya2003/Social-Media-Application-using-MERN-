import React, { useState, useEffect } from "react";
import "./Login.scss";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../Actions/UserAction";
import { useAlert } from "react-alert";

const Login = () => {
  const { error } = useSelector((state) => state.user);
  const { message } = useSelector((state) => state.like);

  const alert = useAlert();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      alert.show(error);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.show(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, dispatch, message]);

  return (
    <div className="login-div">
      <div className="login">
        <form className="loginform" onSubmit={loginHandler}>
          <h2>Instagram Login</h2>
          <p className="head">Welcome Back! Please enter your details.</p>
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
          <Link to="/forgot/password" className="password">
            <p>Forgot Your Password?</p>
          </Link>
          <button type="submit">Sign In</button>
          <Link to="/register" className="signup">
            <p>
              Don't have an account?{" "}
              <span style={{ color: "#1216cb" }}>Sign Up</span>{" "}
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

export default Login;
