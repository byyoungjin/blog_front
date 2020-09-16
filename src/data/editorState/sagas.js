import { put, select, race, take } from "redux-saga/effects";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

import { actions, selectors } from "data";
import * as AT from "data/rootActionTypes";
import {
  addMedia,
  toggleBlockType,
  addAtomic,
  toggleInlineStyle,
  toggleLinkStyle,
  replaceEntityData,
  addEntity,
  applyEntityToBlock,
  removeBlockFromBlockMap
} from "./helper";
import {
  loadContentFromStorage,
  getEditorStateFromRaw
} from "./helper/storage";
import api from "api";
import generateUUID from "utils/generateUUID";

export function* addImage(action) {
  try {
    const { selectedFile, editorState, userId } = action.data;

    const editorStateWithPlaceholder = addMedia({
      type: "placeholder",
      editorState
    });
    yield put(
      actions.editorState.updateEditorState({
        newEditorState: editorStateWithPlaceholder,
        from: "addImage placeholder"
      })
    );

    yield put(actions.editorState.addImageLoading());
    const uuid = generateUUID();
    const fileInfo = {
      fileName: `${userId}/${uuid}`,
      fileType: selectedFile.type
    };

    const res = yield api.awsApi.signS3(fileInfo);
    const { signedRequest, url } = res.data.data;

    const options = {
      headers: {
        "Content-Type": fileInfo.fileType
      }
    };
    const uploadInfo = {
      signedRequest,
      file: selectedFile,
      options
    };

    yield api.awsApi.uploadImage(uploadInfo);

    const newEditorState = addMedia({ type: "image", src: url, editorState });

    yield put(
      actions.editorState.updateEditorState({
        newEditorState,
        from: "addImageSaga"
      })
    );
    yield put(actions.editorState.addImageSuccess({ newEditorState }));
    yield put(actions.editorState.updateSideBarIsOpen(false));
    yield put(
      actions.editorState.updateSideBarPosition({ transform: "scale(0)" })
    );
  } catch (e) {
    console.log("e.message", e.message);
    yield put(actions.editorState.addImageFailure(e));
  }
}

export function* addOtherMedia(action) {
  const { data, editorState, type } = action.data;
  const selection = editorState.getSelection();
  const inputKey = selection.getFocusKey();
  console.log("inputKey", inputKey);
  const newEditorState = addMedia({ type, editorState, src: data });
  const inputRemovedEditorState = removeBlockFromBlockMap({
    editorState: newEditorState,
    blockKey: inputKey
  });
  yield put(
    actions.editorState.updateEditorState({
      newEditorState: inputRemovedEditorState,
      from: "addOtherMedia"
    })
  );
}

export function* replaceEntity(action) {
  const { data, editorState } = action.data;
  const newEditorState = replaceEntityData({ editorState, data });
  yield put(
    actions.editorState.updateEditorState({
      newEditorState,
      from: "replaceEntity"
    })
  );
  yield put(actions.editorState.updateSideBarIsOpen(false));
  yield put(
    actions.editorState.updateSideBarPosition({ transform: "scale(0)" })
  );
}

export function* addAtomicBlock(action) {
  const { editorState, type } = action.data;
  const newEditorState = addAtomic({ type, editorState });
  yield new Promise(resolve => setTimeout(resolve, 10));
  yield put(
    actions.editorState.updateEditorState({
      newEditorState,
      from: "addAtomicBlockSaga"
    })
  );

  yield put(actions.editorState.updateSideBarIsOpen(false));
  yield put(
    actions.editorState.updateSideBarPosition({ transform: "scale(0)" })
  );
}

export function* toggleBlock(action) {
  try {
    const { editorState, type } = action.data;
    const newEditorState = toggleBlockType({ editorState, type });
    yield new Promise(resolve => setTimeout(resolve, 10));
    yield put(
      actions.editorState.updateEditorState({
        newEditorState,
        from: "toggleBlockSaga"
      })
    );
    yield put(actions.editorState.updateSideBarIsOpen(false));
    yield put(
      actions.editorState.updateSideBarPosition({ transform: "scale(0)" })
    );
  } catch (e) {
    console.log("e", e);
  }
}

export function* toggleInline(action) {
  try {
    const { editorState, inlineStyle } = action.data;
    const newEditorState = toggleInlineStyle({ editorState, inlineStyle });
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
      }, 10);
    });
    yield put(
      actions.editorState.updateEditorState({
        newEditorState,
        from: "toggleInlineSaga"
      })
    );
    yield put(
      actions.editorState.updateUpperBarPosition({ transform: "scale(0)" })
    );
  } catch (e) {
    console.log("e", e);
  }
}

export function* toggleLink(action) {
  const { editorState, url } = action.data;
  try {
    const newEditorState = toggleLinkStyle({ editorState, url });
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
      }, 10);
    });
    yield put(
      actions.editorState.updateEditorState({
        newEditorState,
        from: "toggleLinkSaga"
      })
    );
  } catch (e) {
    console.log("e", e);
  }
}

export function* populateEditorState(action) {
  const userId = yield select(selectors.user.getUserId);
  const editorState = yield select(selectors.editorState.getEditorState);
  yield put(actions.editorState.setEditorType("write"));
  const rawEditorState = loadContentFromStorage(userId);
  if (rawEditorState !== null) {
    yield put(
      actions.modal.setModalUp({ modalType: "POPULATE_MODAL", modalProps: {} })
    );

    const { populate } = yield race({
      populate: take(AT.LOAD_SAVED_EDITOR_STATE),
      cancel: take(AT.SET_MODAL_DOWN)
    });

    if (populate) {
      const newEditorState = getEditorStateFromRaw({
        rawEditorState,
        editorState
      });
      yield put(
        actions.editorState.updateEditorState({
          newEditorState,
          from: "populate editorState"
        })
      );
      yield put(actions.modal.setModalDown());
    }
  }
}
