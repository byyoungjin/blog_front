import {
  EditorState,
  AtomicBlockUtils,
  RichUtils,
  Modifier,
  convertToRaw
} from "draft-js";

const addEntity = ({ editorState, src, entityType }) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    entityType,
    "IMMUTABLE",
    src ? { src } : null
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  return { newEditorState, entityKey };
};

export const addAtomic = ({ editorState, src, entityType }) => {
  if (!src && entityType === "image") {
    return;
  }

  const { newEditorState, entityKey } = addEntity({
    editorState,
    src,
    entityType
  });

  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    " "
  );

  return newState;
};

export const toggleBlockType = ({ editorState, blockType }) => {
  const newEditorState = RichUtils.toggleBlockType(editorState, blockType);
  const selectionState = newEditorState.getSelection();
  const newSelectionState = selectionState.merge({
    hasFocus: true
  });
  const focusedEditorState = EditorState.forceSelection(
    newEditorState,
    newSelectionState
  );
  return focusedEditorState;
};

export const toggleBlcokTypeByKey = ({ editorState, blockType, blockKey }) => {
  const selectionState = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const newSelectionState = selectionState.merge({
    focusKey: blockKey,
    anchorKey: blockKey,
    focusOffset: 0,
    anchorOffset: 0,
    hasFocus: true
  });

  const newContentState = Modifier.setBlockType(
    contentState,
    newSelectionState,
    blockType
  );

  const newEditorState = EditorState.set(editorState, {
    currentContent: newContentState
  });

  return newEditorState;
};

export const replaceTextByKey = ({ editorState, blockKey, text }) => {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const newSelectionState = selectionState.merge({
    focusKey: blockKey,
    anchorKey: blockKey,
    focusOffset: 1,
    anchorOffset: 0
  });
  const newContentState = Modifier.replaceText(
    contentState,
    newSelectionState,
    ""
  );
  const newEditorState = EditorState.set(editorState, {
    currentContent: newContentState
  });
  return newEditorState;
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

export const focusOnLastLine = ({ editorState }) => {
  const newEditorState = EditorState.moveFocusToEnd(editorState);
  return newEditorState;
};
