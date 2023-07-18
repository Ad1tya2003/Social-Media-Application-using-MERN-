import React, { useState, useEffect } from "react";
import './updatePassword.scss';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { updateUserPassword } from "../../Actions/UserAction";

const UpdatePassword = () => {
  const { loading, error, message } = useSelector(
    (state) => state.like
  );
  const dispatch = useDispatch();
  const alert = useAlert();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const passwordHandler = (e) => {
    e.preventDefault();
    dispatch(updateUserPassword(oldPassword, newPassword));
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
  }, [dispatch, alert, error, message]);

  return (
    <div className="password-div">
        <form className="passwordform" onSubmit={passwordHandler}>
          <h2>Change Password</h2>
          <input
            type="password"
            placeholder="Enter Your Old Password"
            required
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Enter Your New Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </form>
    </div>
  );
};

export default UpdatePassword;
