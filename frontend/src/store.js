import { configureStore } from "@reduxjs/toolkit";
import {
  allUsersReducer,
  postOfFollowUserReducer,
  userProfileReducer,
  userReducer,
} from "./Reducers/UserReducer";
import {
  likeReducer,
  myPostsReducer,
  userPostsReducer,
} from "./Reducers/Postreducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    postOfFollowUser: postOfFollowUserReducer,
    allUsers: allUsersReducer,
    like: likeReducer,
    myPosts: myPostsReducer,
    userProfile: userProfileReducer,
    userPosts: userPostsReducer,
  },
});

export default store;
