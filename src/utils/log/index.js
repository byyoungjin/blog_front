import { convertToRaw } from "draft-js";

export default editorState => {
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  const selectionState = editorState.getSelection();
  console.log("contentState", raw);
  console.log("selectionState", selectionState);
  const focusKey = selectionState.getFocusKey();
  const startKey = selectionState.getStartKey();
  const endKey = selectionState.getEndKey();
  console.log("focusKey", focusKey);
};
