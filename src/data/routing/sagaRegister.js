import { takeEvery } from "redux-saga/effects";

import * as sagas from "./sagas";
import * as AT from "./actionTypes";

export default function*() {
  yield takeEvery(AT.ROUTE_WITH_ANIMATION, sagas.routeWithAnimation);
}
