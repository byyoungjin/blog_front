import userSagas from "data/user/sagaRegister";
import postSagas from "data/post/sagaRegister";
import { all, fork } from "redux-saga/effects";

export default function* rootSaga() {
  yield all([fork(userSagas), fork(postSagas)]);
}
