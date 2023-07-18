const express = require("express");
const {
  createPost,
  likeAndUnlikePost,
  deletePost,
  getPostOfFollowedUser,
  updateCaption,
  createTweet,
  updateTweet,
  deleteTweet,
  userComments,
  deleteComment,
  getDiscoverPosts,
  savePost,
  unSavePost,
  getSavedPost,
  getPostOfUser,
  getUserPosts,
} = require("../controllers/Postcontrollers");
const { isAuthenticated } = require("../middleware/auth");

const router = express.Router();

router.route("/post/newPost").post(isAuthenticated, createPost);

router.route("/tweet/newTweet").post(isAuthenticated, createTweet);

router.route("/my/posts").get(isAuthenticated, getPostOfUser);

router.route("/userposts/:id").get(isAuthenticated, getUserPosts);

router
  .route("/post/:id")
  .get(isAuthenticated, likeAndUnlikePost)
  .delete(isAuthenticated, deletePost)
  .put(isAuthenticated, updateCaption);

router
  .route("/tweet/:id")
  .put(isAuthenticated, updateTweet)
  .delete(isAuthenticated, deleteTweet);

router.route("/posts").get(isAuthenticated, getPostOfFollowedUser);

router.route("/discoverposts").get(isAuthenticated, getDiscoverPosts);

router.route("/savepost/:id").get(isAuthenticated, savePost);

router.route("/getsavepost").get(isAuthenticated, getSavedPost);

router
  .route("/post/comment/:id")
  .post(isAuthenticated, userComments)
  .delete(isAuthenticated, deleteComment);

module.exports = router;
