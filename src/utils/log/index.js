import { convertToRaw } from "draft-js";

export default (name, editorState) => {
  console.log(name, " editorState", editorState);
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  const selectionState = editorState.getSelection();
  console.log(name, " contentState", raw);
  console.log(name, " selectionState", selectionState);
  const focusKey = selectionState.getFocusKey();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  console.log("name, focusKey", focusKey);
};
