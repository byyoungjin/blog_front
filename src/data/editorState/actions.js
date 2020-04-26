import * as AT from "data/rootActionTypes";

export const addImage = data => ({
  type: AT.ADD_IMAGE,
  data
});

export const addImageLoading = () => ({
  type: AT.ADD_IMAGE_LOADING
});

export const addImageFailure = error => ({
  type: AT.ADD_IMAGE_FAILURE,
  error
});

export const addImageSuccess = data => ({
  type: AT.ADD_IMAGE_SUCCESS,
  data
});

export const updateEditorState = data => ({
  type: AT.UPDATE_EDITOR_STATE,
  data
});
export const updateSideBarIsOpen = data => ({
  type: AT.UPDATE_SIDE_BAR_ISOPEN,
  data
});
export const updateSideBarPosition = data => ({
  type: AT.UPDATE_SIDE_BAR_POSITION,
  data
});
export const updateUpperBarPosition = data => ({
  type: AT.UPDATE_UPPPER_BAR_POSITION,
  data
});

export const toggleBlock = data => ({
  type: AT.TOGGLE_BLOCK,
  data
});

export const addAtomicBlock = data => ({
  type: AT.ADD_ATOMIC_BLOCK,
  data
});

export const toggleEditorReadOnly = data => ({
  type: AT.TOGGLE_EDITOR_READ_ONLY,
  data
});

export const toggleIsLinkInput = data => ({
  type: AT.TOGGLE_IS_LINK_INPUT,
  data
});

export const toggleInline = data => ({
  type: AT.TOGGLE_INLINE,
  data
});
export const toggleLink = data => ({
  type: AT.TOGGLE_LINK,
  data
});
