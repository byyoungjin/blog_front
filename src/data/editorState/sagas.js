import { put, select, race, take } from "redux-saga/effects";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

import { actions, selectors } from "data";
import * as AT from "data/rootActionTypes";
import {
  toggleBlockType,
  toggleeBlcokTypeByKey,
  addAtomic,
  addAtomicAndRemoveCurrent,
  toggleInlineStyle,
  toggleLinkStyle,
  removeBlockFromBlockMap,
  forceSelectionKeyAfter
} from "./helper";
import {
  loadContentFromStorage,
  getEditorStateFromRaw
} from "./helper/storage";
import api from "api";
import generateUUID from "utils/generateUUID";
import log from "utils/log";

//Basic toggle sagas
export function* toggleBlock(action) {
  try {
    const { blockType, blockKey } = action.data;
    const editorState = yield select(selectors.editorState.getEditorState);
    let newEditorState;
    if (blockKey) {
      newEditorState = toggleeBlcokTypeByKey({
        editorState,
        blockType,
        blockKey
      });
    } else {
      newEditorState = toggleBlockType({ editorState, blockType });
    }
    yield put(
      actions.editorState.updateEditorState({
        newEditorState,
        from: "toggleBlockSaga"
      })
    );
    // yield put(actions.editorState.updateSideBarIsOpen(false));
    // yield put(
    //   actions.editorState.updateSideBarPosition({ transform: "scale(0)" })
    // );
  } catch (e) {
    console.log("e", e);
  }
}

export function* toggleInline(action) {
  try {
    const { editorState, inlineStyle } = action.data;
    const newEditorState = toggleInlineStyle({ editorState, inlineStyle });
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

//Add image saga
export function* addImage(action) {
  try {
    const { selectedFile, userId } = action.data;
    const editorState = yield select(selectors.editorState.getEditorState);
    const editorStateWithPlaceholder = addAtomic({
      entityType: "placeholder",
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

    const newEditorState = addAtomic({
      entityType: "image",
      src: url,
      editorState
    });

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

export function* addAtomicBlock(action) {
  const { data, entityType } = action.data;
  const editorState = yield select(selectors.editorState.getEditorState);
  const newEditorState = addAtomic({ entityType, editorState, src: data });

  const contentState = newEditorState.getCurrentContent();
  const selectionState = newEditorState.getSelection();
  const focusKey = selectionState.getFocusKey();
  const atomicBlockKey = contentState.getKeyBefore(focusKey);
  const newSelection = selectionState.merge({
    anchorKey: atomicBlockKey,
    focusKey: atomicBlockKey,
    focusOffset: 0,
    hasFocus: true
  });

  const selectionOnAtomicBlockEditorState = EditorState.forceSelection(
    newEditorState,
    newSelection
  );

  yield put(
    actions.editorState.updateEditorState({
      newEditorState: selectionOnAtomicBlockEditorState,
      from: "addAtomicBlockSaga"
    })
  );

  yield put(actions.editorState.updateSideBarIsOpen(false));
  yield put(
    actions.editorState.updateSideBarPosition({ transform: "scale(0)" })
  );
}

export function* addAtomicBlockAndRemoveCurrent(action) {
  const { data, entityType } = action.data;
  const editorState = yield select(selectors.editorState.getEditorState);
  const inputRemovedEditorState = addAtomicAndRemoveCurrent({
    editorState,
    data,
    entityType
  });

  yield put(
    actions.editorState.updateEditorState({
      newEditorState: inputRemovedEditorState,
      from: "addAtomicBlockAndRemoveCurrent"
    })
  );
}

export function* populateEditorState(action) {
  const { focusOnEditor } = action.payload;
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
    } else {
      yield focusOnEditor();
    }
  }
}

export function* toggleLink(action) {
  const { url } = action.data;
  try {
    const editorState = yield select(selectors.editorState.getEditorState);
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

export function* submitLinkInput(action) {
  const url = action.payload;
  yield put(actions.editorState.toggleLink({ url }));
  yield put(actions.editorState.toggleIsLinkInput(false));
  yield put(actions.editorState.toggleEditorReadOnly(false));
}

export function* submitYoutubeInput(action) {
  const url = action.payload;
  yield put(
    actions.editorState.addAtomicBlockAndRemoveCurrent({
      data: url,
      entityType: "youtube"
    })
  );

  yield put(actions.editorState.toggleEditorReadOnly(false));
}

export function* selectSplashImage(action) {
  const splashInfo = action.payload;
  const editorState = yield select(selectors.editorState.getEditorState);
  const contentState = editorState.getCurrentContent();

  const entityKey = contentState.getLastCreatedEntityKey();
  const newContentState = contentState.replaceEntityData(entityKey, {
    src: splashInfo
  });
  const newEditorState = EditorState.set(editorState, {
    currentContent: newContentState
  });

  yield put(
    actions.editorState.updateEditorState({
      newEditorState
    })
  );
  yield put(actions.editorState.toggleEditorReadOnly(false));
}

export function* submitSplashInput(action) {
  const { keyword, currentPage, setImagesData } = action.payload;
  const res = yield api.unSplashApi.getPhotos({ keyword, currentPage });
  const data = res.data;
  yield setImagesData(data);
  // yield put(actions.editorState.toggleEditorReadOnly(true));
}
