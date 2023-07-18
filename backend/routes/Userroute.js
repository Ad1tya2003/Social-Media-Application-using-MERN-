const express = require("express");
const {
  registerUser,
  login,
  followUser,
  logout,
  updatePassword,
  updateProfile,
  deleteMyProfile,
  myProfile,
  getUserProfile,
  getAllUser,
  forgotPassword,
  resetPassword,
  suggestedUsers,
  searchUser,
} = require("../controllers/Usercontroller");
const { isAuthenticated } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(login);

router.route("/follow/:id").get(isAuthenticated, followUser);

router.route("/suggested").get(isAuthenticated, suggestedUsers);

// router.route("/search").get(isAuthenticated, searchUser);

router.route("/logout").get(isAuthenticated, logout);

router.route("/update/password").put(isAuthenticated, updatePassword);

router.route("/update/profile").put(isAuthenticated, updateProfile);

router.route("/delete/me").delete(isAuthenticated, deleteMyProfile);

router.route("/me").get(isAuthenticated, myProfile);

router.route("/user/:id").get(isAuthenticated, getUserProfile);

router.route("/users").get(isAuthenticated, getAllUser);

router.route("/forgot/password").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

module.exports = router;
