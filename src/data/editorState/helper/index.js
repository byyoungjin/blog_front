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

export const toggleInlineStyle = ({ editorState, inlineStyle }) =>
  RichUtils.toggleInlineStyle(editorState, inlineStyle);

export const toggleLinkStyle = ({ editorState, url }) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
    url
  });

  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  const toggledNewEditorState = RichUtils.toggleLink(
    newEditorState,
    newEditorState.getSelection(),
    entityKey
  );

  return toggledNewEditorState;
};

export const addSplashData = ({ editorState, splashInfo }) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const selectedKey = selection.getFocusKey();
  const selectedBlock = contentState.getBlockForKey(selectedKey);
  const entity = selectedBlock.getEntityAt(0);

  const replacedContentState = contentState.replaceEntityData(entity, {
    splashInfo
  });
  const newEditorState = EditorState.set(editorState, {
    currentContent: replacedContentState
  });
  return newEditorState;
};
