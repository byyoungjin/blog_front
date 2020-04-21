import { put } from "redux-sage/effects";

import { actions } from "data";
import api from "api";

export function* addImage(action) {
  try {
  } catch (e) {
    yield put(actions.editorState.addImageFailure(e));
  }
}
