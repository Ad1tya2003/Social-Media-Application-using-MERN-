import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
// import "./Post.scss";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import { FiMoreVertical } from "react-icons/fi";
import { AiOutlineDelete } from "react-icons/ai";
import { TbBrandTelegram } from "react-icons/tb";

const Tweets = ({
  postId,
  tweets,
  likes = [],
  comments = [],
  ownerName,
  ownerImage,
  ownerId,
  isDelete = false,
  isAccount = false,
}) => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

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
            <button>
              <AiOutlineDelete />
            </button>
          ) : null}
          {isAccount ? (
            <button>
              <FiMoreVertical />
            </button>
          ) : null}
        </div>
      </div>
      <div className="postimg">
        <p>{tweets}</p>
      </div>
      <div className="like">
        <button onClick={handleLike}>
          {liked ? <BsFillHeartFill style={{ color: "red" }} /> : <BsHeart />}
        </button>
        <button>
          <FaRegComment />
        </button>
        <button>
          <TbBrandTelegram />
        </button>
      </div>
      <button className="liked">Liked by 5 others</button>
      <div className="postdetails">
        <p>{ownerName}</p>
      </div>
    </div>
  );
};

export default Tweets;
