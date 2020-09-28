import * as sagas from "./sagas";
import * as AT from "./actionTypes";
import { takeEvery } from "redux-saga/effects";

export default function*() {
  yield takeEvery(AT.ADD_IMAGE, sagas.addImage);
  yield takeEvery(AT.TOGGLE_BLOCK, sagas.toggleBlock);
  yield takeEvery(AT.ADD_ATOMIC_BLOCK, sagas.addAtomicBlock);
  yield takeEvery(AT.TOGGLE_INLINE, sagas.toggleInline);
  yield takeEvery(AT.TOGGLE_LINK, sagas.toggleLink);
  yield takeEvery(AT.POPULATE_EDITOR_STATE, sagas.populateEditorState);
  yield takeEvery(AT.SUBMIT_LINK_INPUT, sagas.submitLinkInput);
  yield takeEvery(AT.SUBMIT_YOUTUBE_INPUT, sagas.submitYoutubeInput);
  yield takeEvery(AT.SUBMIT_SPLASH_INPUT, sagas.submitSplashInput);
  yield takeEvery(AT.SELECT_SPLASH_IMAGE, sagas.selectSplashImage);
}
