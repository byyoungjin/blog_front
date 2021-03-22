import { all, fork } from "redux-saga/effects";

import userSagas from "data/user/sagaRegister";
import postSagas from "data/post/sagaRegister";
import editorStateSagas from "data/editorState/sagaRegister";
import modal from "data/modal/sagaRegister";
import routing from "data/routing/sagaRegister";

export default function* rootSaga() {
  yield all([
    fork(userSagas),
    fork(postSagas),
    fork(editorStateSagas),
    fork(modal),
    fork(routing)
  ]);
}
