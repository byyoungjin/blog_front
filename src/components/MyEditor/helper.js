import { convertToRaw } from "draft-js";

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

export const loadContentFromStorage = id => {
  const savedData = window.localStorage.getItem(EDITOR_STATE + id);
  return savedData ? JSON.parse(savedData) : null;
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

export const getTitlePhotoFrom = editorState => {
  if (!editorState) return;
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { entityMap } = rawContentState;
  Object.keys(entityMap).map(key => {
    const entity = entityMap[key];
    if (entity.type === "unsplash" || entity.type === "image") {
      const titlePhotoUrl = entity.data.data.regularImageSrc;

      return titlePhotoUrl;
    }
    return null;
  });
};
