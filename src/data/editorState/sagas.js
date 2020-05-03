import { put } from "redux-saga/effects";

import { actions } from "data";
import {
  addMedia,
  toggleBlockType,
  addAtomic,
  toggleInlineStyle,
  toggleLinkStyle,
  replaceEntityData
} from "./helper";
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
  yield new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("success");
    }, 10);
  });
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
  // yield put(actions.editorState.toggleEditorReadOnly());
}

export function* toggleBlock(action) {
  try {
    const { editorState, type } = action.data;
    const newEditorState = toggleBlockType({ editorState, type });
    yield new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("success");
      }, 10);
    });
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
