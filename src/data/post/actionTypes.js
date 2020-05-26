import { loading, failure, success } from "data/utils";

export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = success(GET_POSTS);
export const GET_POSTS_FAILURE = failure(GET_POSTS);
export const GET_POSTS_LOADING = loading(GET_POSTS);

export const GET_ONE_POST = "GET_ONE_POST";
export const GET_ONE_POST_SUCCESS = success(GET_ONE_POST);
export const GET_ONE_POST_FAILURE = failure(GET_ONE_POST);
export const GET_ONE_POST_LOADING = loading(GET_ONE_POST);

export const GET_ONE_POST_DETAIL = "GET_ONE_POST_DETAIL";
export const GET_ONE_POST_EDIT = "GET_ONE_POST_EDIT";

export const CREATE_POST = "CREATE_POST";

export const DELETE_POST = "DELETE_POST";

export const UPDATE_POST = "UPDATE_POST";

export const RESET_ONE_POST = "RESET_ONE_POST";

export const GET_ALL_TAGS = "GET_ALL_TAGS";

export const UPDATE_TAGS = "UPDATE_TAGS";

export const UPDATE_CURRENT_TAG = "UPDATE_CURRENT_TAG";

export const RESET_CURRENT_TAG = "RESET_CURRENT_TAG";

export const DELETE_TAG = "DELETE_TAG";
