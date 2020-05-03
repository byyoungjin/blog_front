import { convertToRaw } from "draft-js";

export default editorState => {
  const contentState = editorState.getCurrentContent();
  const raw = convertToRaw(contentState);
  const selectionState = editorState.getSelection();
  console.log("contentState", JSON.stringify(raw, null, 2));
  console.log("selectionState", selectionState);
  const focusKey = selectionState.getFocusKey();
  console.log("focusKey", focusKey);
};
