import * as AT from "data/rootActions";

export const getPosts = userId => ({
  type: AT.GET_POSTS,
  userId
});

export const getPostsLoading = () => ({
  type: AT.GET_POSTS_LOADING
});

export const getPostsSuccess = data => ({
  type: AT.GET_POSTS_SUCCESS,
  data
});

export const getPostsFailure = error => ({
  type: AT.GET_POSTS_FAilure,
  error
});

export const getOnePost = postId => ({
  type: AT.GET_POSTS,
  postId
});

export const getOnePostLoading = () => ({
  type: AT.GET_ONE_POST_LOADING
});

export const getOnePostSuccess = data => ({
  type: AT.GET_ONE_POST_SUCCESS,
  data
});

export const getOnePostFailure = error => ({
  type: AT.GET_ONE_POST_FAilure,
  error
});
