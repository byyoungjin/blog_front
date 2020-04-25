import * as sagas from "./sagas";
import * as AT from "./actionTypes";
import { takeEvery } from "redux-saga/effects";

export default function*() {
  yield takeEvery(AT.ADD_IMAGE, sagas.addImage);
  yield takeEvery(AT.TOGGLE_BLOCK, sagas.toggleBlock);
  yield takeEvery(AT.ADD_ATOMIC_BLOCK, sagas.addAtomicBlock);
}
