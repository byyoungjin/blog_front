import { put, select, race, take } from "redux-saga/effects";

import { selectors, actions, actionTypes as AT } from "data";

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export function* routeWithAnimation(action) {
  const path = action.payload;
  yield put(actions.routing.setIsMounted(false));

  yield take(AT.UNMOUNTED);
  yield put(actions.router.push(path));
}
