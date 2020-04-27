import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

const EDITOR_STATE = "EDITOR_STATE";

const getContentAsRawJson = editorState => {
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  return JSON.stringify(raw, null, 2);
};

export const saveContent = ({ editorState, id }) => {
  const editorstateJson = getContentAsRawJson(editorState);
  window.localStorage.setItem(EDITOR_STATE + id, editorstateJson);
};

const loadContentFromStorage = item => {
  const savedData = window.localStorage.getItem(item);
  return savedData ? JSON.parse(savedData) : null;
};

export const populateEditorState = ({ id, setEditorState, editorState }) => {
  const rawEditorState = loadContentFromStorage(EDITOR_STATE + id);
  if (rawEditorState !== null) {
    const contentState = convertFromRaw(rawEditorState);
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentState
    });
    const focusedEditorState = EditorState.moveFocusToEnd(newEditorState);

    setEditorState({
      newEditorState: focusedEditorState,
      from: "populateEditorState"
    });
  }
};

export const readFile = ({ files, onLoadHandler }) => {
  const selectedFile = files[0];
  const reader = new FileReader();
  reader.onload = e => onLoadHandler(selectedFile);
  reader.onerror = e => {
    reader.abort();
  };
  reader.readAsDataURL(selectedFile);
};
