import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./Post.scss";
import {
  BsHeart,
  BsFillHeartFill,
  BsBookmarkFill,
  BsBookmark,
} from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbBrandTelegram } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  commentOnPost,
  deletePost,
  getMyPosts,
  likePost,
  savePosts,
  updatePost,
} from "../../Actions/PostActions";
import { getPostOfFollowUser, loadUser } from "../../Actions/UserAction";
import { Button, Dialog } from "@mui/material";
import User from "../User/User";
import CommentsCard from "../Comments/CommentsCard";

const Post = ({
  postId,
  caption,
  postImages,
  likes = [],
  comments = [],
  savedPost = [],
  ownerName,
  ownerImage,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const { user } = useSelector((state) => state.user);

  const [liked, setLiked] = useState(false);
  const [likedBy, setLikedBy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentToggle, setCommentToggle] = useState(false);
  const [captionValue, setCaptionValue] = useState(caption);
  const [captionToggle, setCaptionToggle] = useState(false);

  const dispatch = useDispatch();

  const handleLike = async () => {
    setLiked(!liked);
    await dispatch(likePost(postId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getPostOfFollowUser());
    }
  };

  const handleSave = async () => {
    setSaved(!saved);
    await dispatch(savePosts(postId));
  };

  // const handleUnsave = async () => {
  //   // setSaved(saved);
  //   await dispatch(unsavePosts(postId));
  // };

  const commentSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(commentOnPost(postId, commentValue));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getPostOfFollowUser());
    }
  };

  const updateCaptionHandler = (e) => {
    e.preventDefault();
    dispatch(updatePost(captionValue, postId));
    dispatch(getMyPosts());
  };

  const deletePostHandler = async () => {
    await dispatch(deletePost(postId));
    dispatch(getMyPosts());
    dispatch(loadUser());
  };

  useEffect(() => {
    likes.forEach((item) => {
      if (item._id === user._id) {
        setLiked(true);
      }
    });
    savedPost.forEach((item) => {
      if (item._id === user._id) {
        setSaved(true);
      }
    });
  }, [likes, savedPost, user._id]);

  return (
    <div className="post">
      <div className="postheader">
        <div>
          <img src={ownerImage} alt="user" />
          <Link to={`/user/${ownerId}`}>
            <h4>{ownerName}</h4>
          </Link>
        </div>
        <div>
          {isDelete ? (
            <button onClick={deletePostHandler}>
              <AiOutlineDelete />
            </button>
          ) : null}
          {isAccount ? (
            <button onClick={() => setCaptionToggle(!captionToggle)}>
              <FiMoreVertical />
            </button>
          ) : null}
        </div>
      </div>
      <div className="postimg">
        <img src={postImages} alt="post" />
      </div>
      <div className="like">
        <div>
          <button onClick={handleLike}>
            {liked ? <BsFillHeartFill style={{ color: "red" }} /> : <BsHeart />}
          </button>
          <button onClick={() => setCommentToggle(!commentToggle)}>
            <span style={{ fontSize: "1rem" }}>{comments.length}</span>{" "}
            <FaRegComment />
          </button>
          <button>
            <TbBrandTelegram />
          </button>
        </div>
        <button className="save" onClick={handleSave}>
          {saved ? <BsBookmarkFill /> : <BsBookmark />}
        </button>
      </div>
      <button
        className="liked"
        onClick={() => setLikedBy(!likedBy)}
        disabled={likes.length === 0 ? true : false}
      >
        Liked by {likes.length} others
      </button>
      <div className="postdetails">
        <p>{ownerName}</p>
        <p>{caption}</p>
      </div>

      <Dialog open={likedBy} onClose={() => setLikedBy(!likedBy)}>
        <div className="dialog">
          <h3>Liked by</h3>
          {likes.map((like) => (
            <User
              key={like._id}
              userId={like._id}
              name={like.name}
              avatar={like.avatar.url}
            />
          ))}
        </div>
      </Dialog>

      <Dialog
        open={commentToggle}
        onClose={() => setCommentToggle(!commentToggle)}
      >
        <div className="comment-dialog">
          <h3>Comment</h3>

          <form className="comment-form" onSubmit={commentSubmitHandler}>
            <textarea
              type="text"
              placeholder="Write a comment"
              value={commentValue}
              onChange={(e) => setCommentValue(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              Post
            </Button>
          </form>

          {comments.length > 0 ? (
            comments.map((comment) => (
              <CommentsCard
                key={comment._id}
                userId={comment.user._id}
                name={comment.user.name}
                avatar={comment.user.avatar.url}
                comment={comment.comment}
                commentId={comment._id}
                postId={postId}
                isAccount={isAccount}
              />
            ))
          ) : (
            <h4>No Comments Found</h4>
          )}
        </div>
      </Dialog>

      <Dialog
        open={captionToggle}
        onClose={() => setCaptionToggle(!captionToggle)}
      >
        <div className="comment-dialog">
          <h3>Edit Caption</h3>

          <form className="comment-form" onSubmit={updateCaptionHandler}>
            <textarea
              type="text"
              placeholder="Edit Caption"
              value={captionValue}
              onChange={(e) => setCaptionValue(e.target.value)}
              required
            />
            <Button type="submit" variant="contained">
              Edit
            </Button>
          </form>
        </div>
      </Dialog>
    </div>
  );
};

export default Post;
