import * as sagas from "./sagas";
import * as AT from "./actionTypes";
import { takeEvery } from "redux-saga/effects";

export default function*() {
  yield takeEvery(AT.LOG_IN, sagas.login);
  yield takeEvery(AT.LOG_OUT, sagas.logout);
  yield takeEvery(AT.REGISTER, sagas.register);
  yield takeEvery(AT.WHO_AM_I, sagas.whoAmI);
}
