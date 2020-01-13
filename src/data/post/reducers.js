import Remote from "data/remote";
import * as AT from "data/rootActions";

const INITIAL_STATE = {
  [AT.GET_POSTS]: Remote.NotAsked,
  [AT.GET_ONE_POST]: Remote.NotAsked
};

export default function posts(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case AT.GET_POSTS_LOADING:
      return { ...state, [AT.GET_POSTS]: Remote.loading };
    case AT.GET_POSTS_SUCCESS:
      return { ...state, [AT.GET_POSTS]: Remote.Success(action.data) };
    case AT.GET_POSTS_FAILURE:
      return { ...state, [AT.GET_POSTS]: Remote.Failure(action.error) };

    case AT.GET_ONE_POST_LOADING:
      return { ...state, [AT.GET_ONE_POST]: Remote.loading };
    case AT.GET_ONE_POST_SUCCESS:
      return { ...state, [AT.GET_ONE_POST]: Remote.Success(action.data) };
    case AT.GET_ONE_POST_FAILURE:
      return { ...state, [AT.GET_ONE_POST]: Remote.Failure(action.error) };

    default:
      return state;
  }
}
