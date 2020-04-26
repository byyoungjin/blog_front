import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

const getContentAsRawJson = editorState => () => {
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  return JSON.stringify(raw, null, 2);
};

export const saveContent = ({ editorContentState, editorTitleState }) => {
  const titleJson = getContentAsRawJson(editorTitleState)();
  const contentJson = getContentAsRawJson(editorContentState)();
  localStorage.setItem("DraftEditorTitleJson", titleJson);
  localStorage.setItem("DraftEditorContentJson", contentJson);
};

const loadContentFromStorage = item => () => {
  const savedData = localStorage.getItem(item);
  return savedData ? JSON.parse(savedData) : null;
};

export const populateEditorState = (item, setEditorState) => () => {
  const rawEditorData = loadContentFromStorage(item)();
  if (rawEditorData !== null) {
    const contentState = convertFromRaw(rawEditorData);
    const newEditorState = EditorState.createWithContent(contentState);
    setEditorState({ newEditorState, from: "populateEditorState" });
  }
};
