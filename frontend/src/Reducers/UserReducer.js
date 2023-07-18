import { createReducer } from "@reduxjs/toolkit";
const initialState = {
  isAuthenticated: false,
};

export const userReducer = createReducer(initialState, {
  LoginRequest: (state) => {
    state.loding = true;
  },
  LoginSuccess: (state, action) => {
    state.loding = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoginFailure: (state, action) => {
    state.loding = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  RegisterRequest: (state) => {
    state.loding = true;
  },
  RegisterSuccess: (state, action) => {
    state.loding = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  RegisterFailure: (state, action) => {
    state.loding = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LoadUserRequest: (state) => {
    state.loding = true;
  },
  LoadUserSuccess: (state, action) => {
    state.loding = false;
    state.user = action.payload;
    state.isAuthenticated = true;
  },
  LoadUserFailure: (state, action) => {
    state.loding = false;
    state.error = action.payload;
    state.isAuthenticated = false;
  },

  LogOutUserRequest: (state) => {
    state.loding = true;
  },
  LogOutUserSuccess: (state) => {
    state.loding = false;
    state.user = null;
    state.isAuthenticated = false;
  },
  LogOutUserFailure: (state, action) => {
    state.loding = false;
    state.error = action.payload;
    state.isAuthenticated = true;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const postOfFollowUserReducer = createReducer(initialState, {
  postOFollowUserRequest: (state) => {
    state.loding = true;
  },
  postOFollowUserSuccess: (state, action) => {
    state.loding = false;
    state.posts = action.payload;
  },
  postOFollowUserFailure: (state, action) => {
    state.loding = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const allUsersReducer = createReducer(initialState, {
  allUsersRequest: (state) => {
    state.loding = true;
  },
  allUsersSuccess: (state, action) => {
    state.loding = false;
    state.users = action.payload;
  },
  allUsersFailure: (state, action) => {
    state.loding = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});

export const userProfileReducer = createReducer(initialState, {
  userProfileRequest: (state) => {
    state.loding = true;
  },
  userProfileSuccess: (state, action) => {
    state.loding = false;
    state.user = action.payload;
  },
  userProfileFailure: (state, action) => {
    state.loding = false;
    state.error = action.payload;
  },
  clearErrors: (state) => {
    state.error = null;
  },
});
