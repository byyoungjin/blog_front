import {
  EditorState,
  AtomicBlockUtils,
  RichUtils,
  SelectionState
} from "draft-js";

import log from "utils/log";

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
  console.log("entityKey from addAtomic", entityKey);

  const selection = editorState.getSelection();
  const focusKey = selection.getFocusKey();
  console.log("focusKey from addAtomic", focusKey);

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });

  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    " "
  );

  const newContentState = newState.getCurrentContent();
  const keyAfterFocus = newContentState.getKeyAfter(focusKey);

  const newSelectionState = newEditorState.getSelection();
  console.log("newSelectionState", newSelectionState);
  const updatedSelection = newSelectionState.merge({
    focusKey: keyAfterFocus,
    anchorKey: keyAfterFocus,
    focusOffset: 0,
    anchorOffset: 0
  });

  const forceFocusedNewEditorState = EditorState.forceSelection(
    newState,
    updatedSelection
  );

  const forceSelection = forceFocusedNewEditorState.getSelection();
  console.log("forceSelection", forceSelection);

  return forceFocusedNewEditorState;
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

export const replaceEntityData = ({ editorState, data }) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();
  const selectedKey = selection.getFocusKey();

  const selectedBlock = contentState.getBlockForKey(selectedKey);

  let entity = selectedBlock.getEntityAt(0);

  //youtube 링크 넣었을때, youtube block 다음 fragment 가 focus 되는 문제때문에 넣음
  if (entity === null) {
    const beforeSelectedKey = contentState.getKeyBefore(selectedKey);
    const beforeSelectedBlock = contentState.getBlockForKey(beforeSelectedKey);
    entity = beforeSelectedBlock.getEntityAt(0);
    console.log("beforeSelectedKey", beforeSelectedKey);
  }

  const replacedContentState = contentState.replaceEntityData(entity, {
    data
  });
  const newEditorState = EditorState.set(editorState, {
    currentContent: replacedContentState
  });
  return newEditorState;
};
