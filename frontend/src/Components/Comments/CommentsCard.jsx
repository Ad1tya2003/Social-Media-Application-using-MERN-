import React from "react";
import { Link } from "react-router-dom";
import "./CommentsCard.scss";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { deleteCommentOnPost, getMyPosts } from "../../Actions/PostActions";
import { getPostOfFollowUser } from "../../Actions/UserAction";

const CommentsCard = ({
  userId,
  name,
  avatar,
  comment,
  commentId,
  postId,
  isAccount,
}) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const deleteCommentHandler = () => {
    dispatch(deleteCommentOnPost(postId, commentId));

    if (isAccount) {
      dispatch(getMyPosts());
    } else {
      dispatch(getPostOfFollowUser());
    }
  };

  return (
    <div className="commentcard">
      <div>
        <Link to={`user/${userId}`}>
          <img src={avatar} alt="avatar" />
          <h4>{name}</h4>
        </Link>
        {isAccount ? (
          <button onClick={deleteCommentHandler}>
            <MdDeleteOutline />
          </button>
        ) : userId === user._id ? (
          <button onClick={deleteCommentHandler}>
            <MdDeleteOutline />
          </button>
        ) : null}
      </div>

      <p>{comment}</p>
    </div>
  );
};

export default CommentsCard;
