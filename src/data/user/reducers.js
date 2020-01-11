import Cookies from "js-cookie";

import Remote from "data/remote";
import * as AT from "data/rootActionTypes";

const INITIAL_STATE = {
  userSession: Cookies.get("apiToken") || null,
  [AT.LOG_IN]: Remote.NotAsked,
  [AT.REGISTER]: Remote.NotAsked
};

export default function user(state = INITIAL_STATE, action = {}) {
  switch (action.type) {
    case AT.SET_USER_SESSION:
      return { ...state, userSession: action.userSession };
    case AT.RESET_AUTH:
      return { ...state, userSession: null };
    case AT.LOG_IN_LOADING:
      return { ...state, [AT.LOG_IN]: Remote.Loading };
    case AT.LOG_IN_SUCCESS:
      return { ...state, [AT.LOG_IN]: Remote.Success(action.data) };
    case AT.LOG_IN_FAILURE:
      return { ...state, [AT.LOG_IN]: Remote.Failure(action.error) };
    case AT.REGISTER_LOADING:
      return { ...state, [AT.REGISTER]: Remote.Loading };
    case AT.REGISTER_SUCCESS:
      return { ...state, [AT.REGISTER]: Remote.Success(action.data) };
    case AT.REGISTER_FAILURE:
      return { ...state, [AT.REGISTER]: Remote.Failure(action.error) };
    default:
      return state;
  }
}
