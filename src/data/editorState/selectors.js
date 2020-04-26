export const getEditorState = state => state.editorState.editorState;

export const getSideBarPosition = state => state.editorState.sideBar.position;
export const getSideBarIsOpen = state => state.editorState.sideBar.isOpen;

export const getUppperBarPosition = state =>
  state.editorState.upperBar.position;

export const getEditorReadOnly = state => state.editorState.readOnly;

export const getIsLinkInput = state => state.editorState.isLinkInput;
