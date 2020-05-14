import * as sagas from "./sagas";
import * as AT from "./actionTypes";
import { takeEvery } from "redux-saga/effects";

export default function*() {
  yield takeEvery(AT.ADD_IMAGE, sagas.addImage);
  yield takeEvery(AT.TOGGLE_BLOCK, sagas.toggleBlock);
  yield takeEvery(AT.ADD_ATOMIC_BLOCK, sagas.addAtomicBlock);
  yield takeEvery(AT.TOGGLE_INLINE, sagas.toggleInline);
  yield takeEvery(AT.TOGGLE_LINK, sagas.toggleLink);
  yield takeEvery(AT.REPLACE_ENTIY_DATA, sagas.replaceEntity);
  yield takeEvery(AT.POPULATE_EDITOR_STATE, sagas.populateEditorState);
  yield takeEvery(AT.ADD_OTHER_MEDIA, sagas.addOtherMedia);
}
