import { put } from "redux-saga/effects";

import { actions } from "data";
import { addMedia } from "./helper";
import api from "api";

export function* addImage(action) {
  try {
    yield put(actions.editorState.addImageLoading());
    const { selectedFile, editorState } = action.data;
    const fileInfo = {
      fileName: selectedFile.name,
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

    yield put(actions.editorState.updateEditorState({ newEditorState }));
    yield put(actions.editorState.addImageSuccess({ newEditorState }));
  } catch (e) {
    console.log("e.message", e.message);
    yield put(actions.editorState.addImageFailure(e));
  }
}
