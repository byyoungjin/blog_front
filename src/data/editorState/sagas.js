import { put } from "redux-saga/effects";

import { actions } from "data";
import { addMedia } from "./helper";
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
        newEditorState: editorStateWithPlaceholder
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

    yield put(actions.editorState.updateEditorState({ newEditorState }));
    yield put(actions.editorState.addImageSuccess({ newEditorState }));
    yield put(actions.editorState.updateSideBarIsOpen(false));
    yield put(
      actions.editorState.updateSideBarPosition({ transfrom: "scale(0)" })
    );
  } catch (e) {
    console.log("e.message", e.message);
    yield put(actions.editorState.addImageFailure(e));
  }
}
