import { put } from "redux-saga/effects";

import { actions } from "data";

const delay = ms => new Promise(res => setTimeout(res, ms));

export function* modalUpAndGo(action) {
  const { content } = action;
  yield put(
    actions.modal.setModalUp({
      modalType: "INFO_MODAL",
      modalProps: { content }
    })
  );
  yield delay(1000);
  yield put(actions.modal.setModalDown());
}
