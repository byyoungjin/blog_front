import * as AT from "data/rootActionTypes";
import { apply } from "redux-saga/effects";

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

export const replaceEntityData = data => ({
  type: AT.REPLACE_ENTIY_DATA,
  data
});

export const setTitle = data => ({
  type: AT.SET_TITLE,
  data
});

export const setTitlePhoto = data => ({
  type: AT.SET_TITLE_PHOTO,
  data
});

export const setSubTitle = data => ({
  type: AT.SET_SUB_TITLE,
  data
});

export const setEditorType = data => ({
  type: AT.SET_EDITOR_TYPE,
  data
});

export const populateEditorState = payload => ({
  type: AT.POPULATE_EDITOR_STATE,
  payload
});

export const loadSavedEditorState = () => ({
  type: AT.LOAD_SAVED_EDITOR_STATE
});

export const resetEditorState = () => ({
  type: AT.RESET_EDITOR_STATE
});

export const submitLinkInput = payload => ({
  type: AT.SUBMIT_LINK_INPUT,
  payload
});

export const submitYoutubeInput = payload => ({
  type: AT.SUBMIT_YOUTUBE_INPUT,
  payload
});

export const submitSplashInput = payload => ({
  type: AT.SUBMIT_SPLASH_INPUT,
  payload
});

export const selectSplashImage = payload => ({
  type: AT.SELECT_SPLASH_IMAGE,
  payload
});

export const updateSubjectIndexes = payload => ({
  type: AT.UPDATE_SUBJECT_INDEXES,
  payload
});

export const setSubjectIndexes = payload => ({
  type: AT.SET_SUBJECT_INDEXES,
  payload
});
