import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
// import loading from "data/loading";
import post from "data/post/reducers";
import user from "data/user/reducers";

const createRootReducer = history =>
  combineReducers({
    // loading,
    post,
    user,
    router: connectRouter(history)
  });

export { createRootReducer };
