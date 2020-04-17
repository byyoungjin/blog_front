import { loading, failure, success, notAsked } from "data/utils";

export const LOG_IN = "LOG_IN";
export const LOG_IN_SUCCESS = success(LOG_IN);
export const LOG_IN_FAILURE = failure(LOG_IN);
export const LOG_IN_LOADING = loading(LOG_IN);

export const LOG_OUT = "LOG_OUT";

export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = success(REGISTER);
export const REGISTER_FAILURE = failure(REGISTER);
export const REGISTER_LOADING = loading(REGISTER);

export const RESET_AUTH = "RESET_AUTH";

export const SET_USER_SESSION = "SET_USER_SESSION";

export const WHO_AM_I = "WHO_AM_I";
export const WHO_AM_I_SUCCESS = success(WHO_AM_I);
export const WHO_AM_I_FAILURE = failure(WHO_AM_I);
export const WHO_AM_I_LOADING = loading(WHO_AM_I);
