import {
  EditorState,
  AtomicBlockUtils,
  RichUtils,
  Modifier,
  convertToRaw
} from "draft-js";
import log from "utils/log";

export const removeBlockFromBlockMap = ({ editorState, blockKey }) => {
  const contentState = editorState.getCurrentContent();
  const blockMap = contentState.getBlockMap();
  const newBlockMap = blockMap.remove(blockKey);
  const newContentState = contentState.merge({
    blockMap: newBlockMap
  });
  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    "remove-range"
  );
  return newEditorState;
};

export const forceSelectionKeyAfter = ({ editorState, key }) => {
  const contentState = editorState.getCurrentContent();
  const keyAfter = contentState.getKeyAfter(key);
  const selection = editorState.getSelection();
  const newSelection = selection.merge({
    focusKey: keyAfter,
    focustOffset: 0,
    hasFocus: true
  });
  const forcedSelectionEdtorState = EditorState.forceSelection(
    editorState,
    newSelection
  );
  return forcedSelectionEdtorState;
};

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

export const addAtomicAndRemoveCurrent = ({
  editorState,
  data,
  entityType
}) => {
  const selection = editorState.getSelection();
  const inputKey = selection.getFocusKey();
  const newEditorState = addAtomic({ entityType, editorState, src: data });

  const newSelection = newEditorState.getSelection();

  const inputRemovedEditorState = removeBlockFromBlockMap({
    editorState: newEditorState,
    blockKey: inputKey
  });

  return inputRemovedEditorState;
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

export const toggleeBlcokTypeByKey = ({ editorState, blockType, blockKey }) => {
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

  console.log(
    "newEditorState.getCurrentContent()",
    convertToRaw(newEditorState.getCurrentContent())
  );
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
