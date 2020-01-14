import * as sagas from "./sagas";
import * as AT from "./actionTypes";
import { takeEvery } from "redux-saga/effects";

export default function*() {
  yield takeEvery(AT.CREATE_POST, sagas.createPost);
  yield takeEvery(AT.GET_ONE_POST, sagas.getOnePost);
  yield takeEvery(AT.GET_POSTS, sagas.getPosts);
}
