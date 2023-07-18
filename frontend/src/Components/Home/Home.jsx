import React from "react";
import Sidebar from "../Header/Sidebar";
import "./Home.scss";
import Post from "../Post/Post";
import Loader from "../Loader/Loader";
import Suggested from "../../utils/Suggested";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPostOfFollowUser } from "../../Actions/UserAction";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();

  const alert = useAlert();

  const { error: likeError, message } = useSelector((state) => state.like);

  const { loading, posts, error } = useSelector(
    (state) => state.postOfFollowUser
  );

  useEffect(() => {
    dispatch(getPostOfFollowUser());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch({ type: "clearErrors" });
    }

    if (likeError) {
      alert.error(likeError);
      dispatch({ type: "clearErrors" });
    }
    if (message) {
      alert.show(message);
      dispatch({ type: "clearMessage" });
    }
  }, [alert, error, message, likeError, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <div className="home">
      <Sidebar />
      <div className="home-right">
        <div className="userpost">
          {posts && posts.length > 0 ? (
            posts.map((post) => (
              <Post
                postId={post._id}
                caption={post.caption}
                postImages={post.Postimages?.url}
                likes={post.likes}
                comments={post.comments}
                savedPost={post.saved}
                ownerImage={post.owner.avatar.url}
                key={post._id}
                ownerName={post.owner.name}
                ownerId={post.owner._id}
              />
            ))
          ) : (
            <h3>No Post Found</h3>
          )}
        </div>
        <Suggested />
      </div>
    </div>
  );
};

export default Home;
