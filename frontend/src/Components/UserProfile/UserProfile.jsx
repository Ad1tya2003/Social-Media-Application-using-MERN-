import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import Post from "../Post/Post";
import { useAlert } from "react-alert";
import { Avatar, Dialog } from "@mui/material";
import User from "../User/User";
import { useParams } from "react-router-dom";
import {
  followAndUnfollowUser,
  getUserPosts,
  getUserProfile,
} from "../../Actions/UserAction";

const UserProfile = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();

  const {
    user,
    loading: userLoading,
    error: userError,
  } = useSelector((state) => state.userProfile);
  const { user: me } = useSelector((state) => state.user);
  const { loading, error, posts } = useSelector((state) => state.userPosts);
  const {
    error: followError,
    message,
    loading: followLoading,
  } = useSelector((state) => state.like);

  const [followerToggle, setFollowerToggle] = useState(false);
  const [followingToggle, setFollowingToggle] = useState(false);
  const [following, setFollowing] = useState(false);
  const [myProfile, setMyProfile] = useState(false);

  const userFollowHandler = async () => {
    setFollowing(!following);
    await dispatch(followAndUnfollowUser(user._id));
    dispatch(getUserProfile(params.id));
  };

  useEffect(() => {
    dispatch(getUserPosts(params.id));
    dispatch(getUserProfile(params.id));
  }, [dispatch, params.id]);

  useEffect(() => {
    if (me._id === params.id) {
      setMyProfile(true);
    }

    if (user) {
      user.followers.forEach((item) => {
        if (item._id === me._id) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
      });
    }
  }, [user, me._id, params.id]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }
    if (followError) {
      alert.show(followError);
      dispatch({ type: "clearErrors" });
    }
    if (userError) {
      alert.show(userError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.show(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, followError, userError, dispatch]);

  return loading === true || userLoading === true ? (
    <Loader />
  ) : (
    <div className="account">
      {user && (
        <>
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
                {myProfile ? null : (
                  <button onClick={userFollowHandler} disabled={followLoading}>
                    {following ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
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

      <div className="allpost">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              caption={post.caption}
              postImages={post.Postimages.url}
              likes={post.likes}
              comments={post.comments}
              ownerImage={post.owner.avatar.url}
              ownerName={post.owner.name}
              ownerId={post.owner._id}
            />
          ))
        ) : (
          <h4>No Post Found</h4>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
