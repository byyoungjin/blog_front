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
export const updateUpperBarPostion = data => ({
  type: AT.UPDATE_UPPPER_BAR_POSITION,
  data
});

export const toggleBlock = data => ({
  type: AT.TOGGLE_BLOCK,
  data
});

export const addDash = data => ({
  type: AT.ADD_DASH,
  data
});
