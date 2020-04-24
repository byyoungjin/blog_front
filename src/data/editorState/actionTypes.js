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

export const ADD_BLOCK = "ADD_BLOCK";
