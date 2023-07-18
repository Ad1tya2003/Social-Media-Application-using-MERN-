import React, { useState } from "react";
import { useEffect, useRef } from "react";
import "./Account.scss";
import { useDispatch, useSelector } from "react-redux";
import { getMyPosts, getsavePosts } from "../../Actions/PostActions";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { useAlert } from "react-alert";
import { Avatar, Dialog } from "@mui/material";
import User from "../User/User";
import { logOutUser } from "../../Actions/UserAction";
import { Link } from "react-router-dom";
import { BsGrid3X3, BsSave } from "react-icons/bs";

const Account = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { user, loading: userLoading } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.myPosts);
  const {
    error: likeError,
    message,
    savedPost,
  } = useSelector((state) => state.like);

  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);

  const allPostTab = useRef(null);
  const savedPostTab = useRef(null);
  const switcherTab = useRef(null);

  const logOutHandler = async () => {
    await dispatch(logOutUser());
    alert.show("Logged out successfully");
  };

  useEffect(() => {
    dispatch(getMyPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getsavePosts());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (likeError) {
      alert.show(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.show(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  const switchTabs = (e, tab) => {
    if (tab === "allPost") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      savedPostTab.current.classList.remove("shiftToNeutralForm");
      allPostTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "savedPost") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      savedPostTab.current.classList.add("shiftToNeutralForm");
      allPostTab.current.classList.add("shiftToLeft");
    }
  };

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      <div className="account-header">
        <div>
          <Avatar src={user.avatar.url} className="avatar" />
        </div>
        <div className="account-details">
          <div className="div-1">
            <div className="div-11">
              <div>
                <p>Name:</p> <p>&nbsp;{user.name}</p>
              </div>
              <div>
                <p>Username:</p> <p>&nbsp;{user.username}</p>
              </div>
            </div>
            <div className="div-12">
              <div>
                <p>Email:</p> <p>&nbsp;{user.email}</p>
              </div>
            </div>
          </div>
          <div className="div-2">
            <div onClick={() => setFollowerToggle(!followerToggle)}>
              <p>{user.followers.length}</p>
              <button>Followers</button>
            </div>
            <div onClick={() => setFollowingToggle(!followingToggle)}>
              <p>{user.following.length}</p>
              <button>Following</button>
            </div>

            <div>
              <p>{user.posts.length}</p>
              <p>Posts</p>
            </div>
          </div>
          <div className="div-3">
            <button onClick={logOutHandler}>Logout</button>

            <Link to="/update/profile">Edit Profile</Link>

            <Dialog
              open={followerToggle}
              onClose={() => setFollowerToggle(!followerToggle)}
            >
              <div className="dialog">
                <h3>Followers</h3>

                {user && user.followers.length > 0 ? (
                  user.followers.map((follower) => (
                    <User
                      key={follower._id}
                      userId={follower._id}
                      name={follower.name}
                      avatar={follower.avatar.url}
                    />
                  ))
                ) : (
                  <p>No Followers</p>
                )}
              </div>
            </Dialog>
            <Dialog
              open={followingToggle}
              onClose={() => setFollowingToggle(!followingToggle)}
            >
              <div className="dialog">
                <h3>Followers</h3>

                {user && user.following.length > 0 ? (
                  user.following.map((following) => (
                    <User
                      key={following._id}
                      userId={following._id}
                      name={following.name}
                      avatar={following.avatar.url}
                    />
                  ))
                ) : (
                  <p>No one in your following</p>
                )}
              </div>
            </Dialog>
          </div>
        </div>
      </div>
      <div>
        <div>
          <div className="post-toggle">
            <p onClick={(e) => switchTabs(e, "allPost")}>
              <BsGrid3X3 />
            </p>
            <p onClick={(e) => switchTabs(e, "savedPost")}>
              <BsSave />
            </p>
          </div>
          <button hidden ref={switcherTab} />
        </div>
        <div className="allpost" ref={allPostTab}>
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImages={post.Postimages.url}
                likes={post.likes}
                savedPost={post.saved}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                isAccount={true}
                isDelete={true}
              />
            ))
          ) : (
            <h4>No Post Found</h4>
          )}
        </div>
        <div className="savedPost" ref={savedPostTab}>
          {savedPost && savedPost.length > 0 ? (
            savedPost.map((post) => (
              <Post
                key={post._id}
                postId={post._id}
                caption={post.caption}
                postImages={post.Postimages.url}
                likes={post.likes}
                savedPost={post.saved}
                comments={post.comments}
                ownerImage={post.owner.avatar.url}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
                // isAccount={true}
                // isDelete={true}
              />
            ))
          ) : (
            <h4>No Post Found</h4>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
