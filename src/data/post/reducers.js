import { EditorState } from "draft-js";

import Remote from "data/remote";
import * as AT from "data/rootActionTypes";
import { actions } from "data";

const INITIAL_STATE = {
  posts: [],
  [AT.GET_POSTS]: Remote.NotAsked,
  [AT.GET_ONE_POST]: Remote.NotAsked
};

export default function posts(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case AT.GET_POSTS_LOADING:
      return { ...state, [AT.GET_POSTS]: Remote.loading };
    case AT.GET_POSTS_SUCCESS:
      return {
        ...state,
        [AT.GET_POSTS]: Remote.Success(action.data),
        posts: action.data
      };
    case AT.GET_POSTS_FAILURE:
      return { ...state, [AT.GET_POSTS]: Remote.Failure(action.error) };

    case AT.GET_ONE_POST_LOADING:
      return { ...state, [AT.GET_ONE_POST]: Remote.loading };
    case AT.GET_ONE_POST_SUCCESS:
      const newCurrentPost = {
        editorTitleState: action.data.editorTitleState,
        editorContentState: action.data.editorContentState
      };
      return {
        ...state,
        [AT.GET_ONE_POST]: Remote.Success(action.data),
        currentPost: newCurrentPost
      };
    case AT.GET_ONE_POST_FAILURE:
      return { ...state, [AT.GET_ONE_POST]: Remote.Failure(action.error) };

    default:
      return state;
  }
}
