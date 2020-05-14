import {
  EditorState,
  AtomicBlockUtils,
  RichUtils,
  SelectionState,
  Modifier
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

export const addEntity = ({ editorState, type }) => {
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity(
    type,
    "IMMUTABLE",
    null
  );
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  const newEditorState = EditorState.set(editorState, {
    currentContent: contentStateWithEntity
  });
  return { newEditorState, entityKey };
};

export const applyEntityToBlock = ({ editorState, type }) => {
  const { newEditorState, entityKey } = addEntity({ editorState, type });
  console.log("newEditorState", newEditorState);
  console.log("entityKey", entityKey);
  const newContentState = newEditorState.getCurrentContent();
  const newSelectionState = newEditorState.getSelection();
  const entityAppliedContentState = Modifier.applyEntity(
    newContentState,
    newSelectionState,
    entityKey
  );
  const entityAppliedEditorState = EditorState.set(newEditorState, {
    currentContent: entityAppliedContentState
  });

  const toggledEditorState = RichUtils.toggleLink(
    entityAppliedEditorState,
    newSelectionState
  );
  return entityAppliedEditorState;
};

export const addAtomic = ({ editorState, type }) => {
  const { newEditorState, entityKey } = addEntity({ editorState, type });

  const newState = AtomicBlockUtils.insertAtomicBlock(
    newEditorState,
    entityKey,
    " "
  );

  return newState;
};

export const toggleBlockType = ({ editorState, type }) => {
  const newEditorState = RichUtils.toggleBlockType(editorState, type);
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

export const replaceEntityData = ({ editorState, data, type }) => {
  const contentState = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  const selectedKey = selection.getFocusKey();

  const selectedBlock = contentState.getBlockForKey(selectedKey);

  let entity = selectedBlock.getEntityAt(0);

  // //youtube 링크 넣었을때, youtube block 다음 fragment 가 focus 되는 문제때문에 넣음
  // if (entity === null) {
  //   const beforeSelectedKey = contentState.getKeyBefore(selectedKey);
  //   const beforeSelectedBlock = contentState.getBlockForKey(beforeSelectedKey);
  //   entity = beforeSelectedBlock.getEntityAt(0);
  //   console.log("beforeSelectedKey", beforeSelectedKey);
  // }

  const replacedContentState = contentState.replaceEntityData(entity, {
    data
  });
  const newEditorState = EditorState.set(editorState, {
    currentContent: replacedContentState
  });
  return newEditorState;
};
