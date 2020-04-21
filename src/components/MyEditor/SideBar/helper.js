import { EditorState, AtomicBlockUtils, RichUtils } from "draft-js";

export const addMedia = ({ editorState, src, type }) => {
  if (!src) {
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

export const fileSelectHandler = (editorState, onChange, e) => {
  const selctedFile = e.target.files[0];

  const reader = new FileReader();
  reader.onload = e => {
    onChange(addMedia({ type: "image", src: e.target.result, editorState }));
  };

  reader.readAsDataURL(selctedFile);
};
