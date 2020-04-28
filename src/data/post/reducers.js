import { EditorState } from "draft-js";
import produce from "immer";

import Remote from "data/remote";
import * as AT from "data/rootActionTypes";
import { actions } from "data";

const INITIAL_STATE = {
  posts: [],
  currentPost: null,
  [AT.GET_POSTS]: Remote.NotAsked,
  [AT.GET_ONE_POST]: Remote.NotAsked
};

const posts = produce((draft, action) => {
  switch (action.type) {
    case AT.GET_POSTS_LOADING:
      draft[AT.GET_POSTS] = Remote.loading;
      break;
    case AT.GET_POSTS_SUCCESS:
      draft[AT.GET_POSTS] = Remote.Success(action.data);
      draft.posts = action.data;
      break;
    case AT.GET_POSTS_FAILURE:
      draft[AT.GET_POSTS] = Remote.Failure(action.error);
      break;
    case AT.GET_ONE_POST_LOADING:
      draft[AT.GET_ONE_POST] = Remote.loading;
      break;
    case AT.GET_ONE_POST_SUCCESS:
      draft.currentPost = action.data;
      draft[AT.GET_ONE_POST] = Remote.Success(action.data);
      break;
    case AT.GET_ONE_POST_FAILURE:
      draft[AT.GET_ONE_POST] = Remote.Failure(action.error);
      break;
    default:
      return;
  }
}, INITIAL_STATE);

export default posts;
