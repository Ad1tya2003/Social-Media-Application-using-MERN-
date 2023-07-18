import React, { useState } from "react";
import "./NewPost.scss";
import { MdUploadFile } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { newPost } from "../../Actions/PostActions";
import { useEffect } from "react";
import { useAlert } from "react-alert";
import { loadUser } from "../../Actions/UserAction";

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState(" ");
  const alert = useAlert();

  const { loading, error, message } = useSelector((state) => state.like);

  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    const Reader = new FileReader();
    Reader.readAsDataURL(file);

    Reader.onload = () => {
      if (Reader.readyState === 2) {
        setImage(Reader.result);
      }
    };
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(newPost(caption, image));
    dispatch(loadUser());
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
    <div className="newPost">
      <div className="newPost-div">
        <div>
          <div className="newPost-text">
            <p>Add Post</p>
            <p>Post image to your account</p>
          </div>
          <div className="newPost-container">
            {image ? (
              <img src={image} alt="post" />
            ) : (
              <label className="newPostlabel">
                <div>
                  <div className="newPost-svg">
                    <MdUploadFile />
                    <p>Select Images from files</p>
                  </div>
                </div>
                {/* {image && <img src={image} alt="post" />} */}
              </label>
            )}
          </div>
        </div>
        <div className="newPost-form">
          <form className="newPostform" onSubmit={formSubmitHandler}>
            <p>Caption</p>
            <input
              type="text"
              placeholder="Add a caption"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
            />
            <input
              type="file"
              className="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            <button disabled={loading} type="submit">
              {loading ? <p>Posting..</p> : <p>Post</p>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
