import * as AT from "data/rootActionTypes";

export const getPosts = payload => ({
  type: AT.GET_POSTS,
  payload
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

export const updatePost = () => ({
  type: AT.UPDATE_POST
});

export const deletePost = postId => ({
  type: AT.DELETE_POST,
  postId
});

export const resetOnePost = () => ({
  type: AT.RESET_ONE_POST
});

export const getOnePostDetail = postId => ({
  type: AT.GET_ONE_POST_DETAIL,
  postId
});

export const getOnePostEdit = postId => ({
  type: AT.GET_ONE_POST_EDIT,
  postId
});

export const getAllTags = () => ({
  type: AT.GET_ALL_TAGS
});

export const updateTags = payload => ({
  type: AT.UPDATE_TAGS,
  payload
});

export const updateCurrentTag = payload => ({
  type: AT.UPDATE_CURRENT_TAG,
  payload
});

export const resetCurrentTags = () => ({
  type: AT.RESET_CURRENT_TAG
});

export const deleteTag = payload => ({
  type: AT.DELETE_TAG,
  payload
});
