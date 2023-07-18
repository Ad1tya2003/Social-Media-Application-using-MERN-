import axios from "axios";

export const likePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "likeRequest",
    });

    const { data } = await axios.get(`/api/v1/post/${id}`);

    dispatch({
      type: "likeSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "likeFailure",
      payload: error.response.data.message,
    });
  }
};

export const commentOnPost = (id, comment) => async (dispatch) => {
  try {
    dispatch({
      type: "commentRequest",
    });

    const { data } = await axios.post(
      `/api/v1/post/comment/${id}`,
      {
        comment,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );

    dispatch({
      type: "commentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "commentFailure",
      payload: error.response.data.message,
    });
  }
};

export const deleteCommentOnPost = (id, commentId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteCommentRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/comment/${id}`, {
      data: { commentId },
    });

    dispatch({
      type: "deleteCommentSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCommentFailure",
      payload: error.response.data.message,
    });
  }
};

export const getMyPosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "myPostsRequest",
    });

    const { data } = await axios.get(`/api/v1/my/posts`);

    dispatch({
      type: "myPostsSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "myPostsFailure",
      payload: error.response.data.message,
    });
  }
};

export const newPost = (caption, Postimages) => async (dispatch) => {
  try {
    dispatch({
      type: "newPostRequest",
    });

    const { data } = await axios.post(
      `/api/v1/post/newPost`,
      {
        caption,
        Postimages,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "newPostSuccess",
      payload: data.posts,
    });
  } catch (error) {
    dispatch({
      type: "newPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const updatePost = (caption, id) => async (dispatch) => {
  try {
    dispatch({
      type: "updateCaptionRequest",
    });

    const { data } = await axios.put(
      `/api/v1/post/${id}`,
      {
        caption,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch({
      type: "updateCaptionSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "updateCaptionFailure",
      payload: error.response.data.message,
    });
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deletePostRequest",
    });

    const { data } = await axios.delete(`/api/v1/post/${id}`);

    dispatch({
      type: "deletePostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deletePostFailure",
      payload: error.response.data.message,
    });
  }
};

export const savePosts = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "savedPostRequest",
    });

    const { data } = await axios.get(`/api/v1/savepost/${id}`);

    dispatch({
      type: "savedPostSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "savedPostFailure",
      payload: error.response.data.message,
    });
  }
};

export const getsavePosts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getSavedPostRequest",
    });

    const { data } = await axios.get(`/api/v1/getsavepost`);

    dispatch({
      type: "getSavedPostSuccess",
      payload: data.savedPost,
    });
  } catch (error) {
    dispatch({
      type: "getSavedPostFailure",
      payload: error.response.data.message,
    });
  }
};
