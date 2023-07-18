import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../../Actions/UserAction";
import { useAlert } from "react-alert";
import { Link, useParams } from "react-router-dom";

const ResetPassword = () => {
  const { error, loading, message } = useSelector((state) => state.like);

  const alert = useAlert();
  const dispatch = useDispatch();
  const params = useParams();

  const [password, setPassword] = useState("");

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(params.token, password));
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
        <form className="loginform" onSubmit={resetPasswordHandler}>
          <h2>Reset Password</h2>
          <p className="head">Reset Your Password</p>
          <p className="email">Password</p>
          <input
            type="password"
            placeholder="Enter Your New Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Link to="/" className="password">
            <p>Go Back To Login</p>
          </Link>

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
          <Link to="/forgot/password" className="signup">
            <p>
              Send Another Password{" "}
              <span style={{ color: "#1216cb" }}>Reset Link</span>{" "}
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

export default ResetPassword;
