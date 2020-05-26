import * as sagas from "./sagas";
import * as AT from "./actionTypes";
import { takeEvery } from "redux-saga/effects";

export default function*() {
  yield takeEvery(AT.CREATE_POST, sagas.createPost);
  yield takeEvery(AT.GET_ONE_POST, sagas.getOnePost);
  yield takeEvery(AT.GET_POSTS, sagas.getPosts);
  yield takeEvery(AT.UPDATE_POST, sagas.updatePost);
  yield takeEvery(AT.DELETE_POST, sagas.deletePost);
  yield takeEvery(AT.GET_ONE_POST_DETAIL, sagas.getOnePostDetail);
  yield takeEvery(AT.GET_ONE_POST_EDIT, sagas.getOnePostEdit);
  yield takeEvery(AT.GET_ALL_TAGS, sagas.getAllTags);
  yield takeEvery(AT.DELETE_TAG, sagas.deleteTag);
}
