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
