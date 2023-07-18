import React from "react";
import "./EditProfile.scss";
import { useDispatch, useSelector } from "react-redux";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Loader from "../Loader/Loader";
import { useAlert } from "react-alert";
import {
  deleteProfile,
  loadUser,
  logOutUser,
  updateUserProfile,
} from "../../Actions/UserAction";
import { Link } from "react-router-dom";

const EditProfile = () => {
  const { user, loading, error } = useSelector((state) => state.user);
  const {
    loading: updateLoading,
    error: updateError,
    message,
  } = useSelector((state) => state.like);

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar.url);
  const [avatarPreview, setAvatarPreview] = useState(user.avatar.url);

  const dispatch = useDispatch();

  const alert = useAlert();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setAvatarPreview(Reader.result);
        setAvatar(Reader.result);
      }
    };
  };

  const registerHandler = async (e) => {
    e.preventDefault();
    await dispatch(updateUserProfile(email, name, username, avatar));
    dispatch(loadUser());
  };

  const deleteProfileHandler = async () => {
    await dispatch(deleteProfile());
    dispatch(logOutUser());
  };

  useEffect(() => {
    if (error) {
      alert.show(error);
      dispatch({ type: "clearErrors" });
    }
    if (updateError) {
      alert.show(updateError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.show(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, alert, error, updateError, message]);

  return loading ? (
    <Loader />
  ) : (
    <>
      <h2>Edit Profile</h2>
      <div className="edit-profile">
        <div className="edit-profile-1">
          <h3>Profile</h3>
          <div className="edit-profile-container">
            <Avatar
              src={avatarPreview}
              className="avatar"
              sx={{ height: "10vmax", width: "10vmax" }}
            />
            <p className="name">{user.name}</p>
            <p style={{ color: "#64748b" }}>{user.username}</p>
            <div className="div-2">
              <div>
                <p>{user.posts.length}</p>
                <p className="edit-name">Posts</p>
              </div>
              <div>
                <p>{user.followers.length}</p>
                <p className="edit-name">Followers</p>
              </div>
              <div>
                <p>{user.following.length}</p>
                <p className="edit-name">Following</p>
              </div>
            </div>
            <button>Update Avatar</button>
            <button
              className="delete"
              onClick={deleteProfileHandler}
              disabled={updateLoading}
            >
              Delete Profile
            </button>
          </div>
        </div>
        <div className="edit-profile-2">
          <h3>Account Info</h3>
          <form className="loginform" onSubmit={registerHandler}>
            <p className="email">Name</p>
            <input
              type="text"
              placeholder="Enter Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <p className="email">UserName</p>
            <input
              type="text"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <p className="email">Email</p>
            <input
              type="email"
              placeholder="Enter Your Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p>Avatar</p>
            <div
              style={{
                display: "flex",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
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
            <button type="submit" disabled={updateLoading}>
              {updateLoading ? "Saving..." : "Save Changes"}
            </button>
            <Link to="/update/password">Change Password</Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
