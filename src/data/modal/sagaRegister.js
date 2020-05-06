import { takeEvery } from "redux-saga/effects";

import * as sagas from "./sagas";
import * as AT from "./actionTypes";

export default function*() {
  yield takeEvery(AT.MODAL_UP_AND_GO, sagas.modalUpAndGo);
}
