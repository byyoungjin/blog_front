import { EditorState, AtomicBlockUtils } from "draft-js";

export const addMedia = ({ editorState, src, type }) => {
  if (!src && type !== "placeholder") {
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
  return newState;
};
