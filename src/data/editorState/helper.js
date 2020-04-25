import { EditorState, AtomicBlockUtils, RichUtils } from "draft-js";

export const addMedia = ({ editorState, src, type }) => {
  if (!src && type === "image") {
    return;
  }
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(type, "IMMUTABLE", {
    src
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    " "
  );
  const focusedNewEditorState = EditorState.moveFocusToEnd(newState);
  return focusedNewEditorState;
};

export const addAtomic = ({ editorState, type }) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    type,
    "IMMUTABLE",
    null
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  console.log("entityKey", entityKey);
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    " "
  );
  const focusedNewEditorState = EditorState.moveFocusToEnd(newState);

  return focusedNewEditorState;
};

export const toggleBlockType = ({ editorState, type }) => {
  const newEditorState = RichUtils.toggleBlockType(editorState, type);
  const focusedNewEditorState = EditorState.moveFocusToEnd(newEditorState);
  return focusedNewEditorState;
};
