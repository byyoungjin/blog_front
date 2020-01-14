import * as AT from "data/rootActionTypes";

export const currentPostChange = post => ({
  type: AT.CURRENT_POST_CHANGE,
  post
});

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
  type: AT.GET_POSTS_FAILURE,
  error
});

export const getOnePost = postId => ({
  type: AT.GET_ONE_POST,
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
  type: AT.GET_ONE_POST_FAILURE,
  error
});

export const createPost = postStates => ({
  type: AT.CREATE_POST,
  postStates
});

export const updatePost = ({ postId, newPost }) => ({
  type: AT.UPDATE_POST,
  postId,
  newPost
});

export const deletePost = postId => ({
  type: AT.DELETE_POST,
  postId
});