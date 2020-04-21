import { connectRouter } from "connected-react-router";
import { combineReducers } from "redux";
// import loading from "data/loading";
import post from "data/post/reducers";
import user from "data/user/reducers";
import modal from "data/modal/reducer";
import editorState from "data/editorState/reducer";

const createRootReducer = history =>
  combineReducers({
    // loading,
    post,
    user,
    router: connectRouter(history),
    modal,
    editorState
  });

export { createRootReducer };
