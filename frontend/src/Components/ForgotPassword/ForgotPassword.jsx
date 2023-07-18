import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgotPassword } from "../../Actions/UserAction";
import { useAlert } from "react-alert";

const ForgotPassword = () => {
  const { error, loading, message } = useSelector((state) => state.like);

  const alert = useAlert();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");

  const forgotPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
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
        <form className="loginform" onSubmit={forgotPasswordHandler}>
          <h2>Forgot Password</h2>
          <p className="head">Please enter your details.</p>
          <p className="email">Email</p>
          <input
            type="email"
            placeholder="Enter Your Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            style={{ marginTop: "1rem" }}
          >
            {loading ? "Sending..." : "Send Email"}
          </button>
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

export default ForgotPassword;
