import { loading, failure, success } from "data/utils";

export const ADD_IMAGE = "ADD_IMAGE";
export const ADD_IMAGE_SUCCESS = success(ADD_IMAGE);
export const ADD_IMAGE_FAILURE = failure(ADD_IMAGE);
export const ADD_IMAGE_LOADING = loading(ADD_IMAGE);

export const UPDATE_EDITOR_STATE = "UPDATE_EDITOR_STATE";

export const UPDATE_SIDE_BAR_ISOPEN = "UPDATE_SIDE_BAR_ISOPEN";
export const UPDATE_SIDE_BAR_POSITION = "UPDATE_SIDE_BAR_POSITION";

export const UPDATE_UPPPER_BAR_POSITION = "UPDATE_UPPPER_BAR_POSITION";

export const DELETE_IMAGE = "DELETE_IMAGE";

export const TOGGLE_BLOCK = "TOGGLE_BLOCK";

export const ADD_ATOMIC_BLOCK = "ADD_ATOMIC_BLOCK";

export const TOGGLE_EDITOR_READ_ONLY = "TOGGLE_EDITOR_READ_ONLY";

export const TOGGLE_IS_LINK_INPUT = "TOGGLE_IS_LINK_INPUT";

export const TOGGLE_INLINE = "TOGGLE_INLINE";

export const TOGGLE_LINK = "TOGGLE_LINK";

export const ADD_SPLASH_IMAGE = "ADD_SPLASH_IMAGE";
