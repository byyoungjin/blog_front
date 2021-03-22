import { put, select, race, take } from "redux-saga/effects";

import { selectors, actions, actionTypes as AT } from "data";

export function* routeWithAnimation(action) {
  const path = action.payload;
  yield put(actions.editorState.resetEditorState());
  yield put(actions.routing.setIsMounted(false));

  yield take(AT.UNMOUNTED);

  if (path === "/postWrite") {
    yield put(actions.editorState.populateEditorState());
  }

  yield put(actions.router.push(path));
}
