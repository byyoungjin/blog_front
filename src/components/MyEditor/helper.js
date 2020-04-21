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

export const populateEditorState = ({ setEditorState, id }) => {
  const rawEditorState = loadContentFromStorage(EDITOR_STATE + id);
  if (rawEditorState !== null) {
    const contentState = convertFromRaw(rawEditorState);
    const editorState = EditorState.createWithContent(contentState);
    setEditorState(editorState);
  }
};