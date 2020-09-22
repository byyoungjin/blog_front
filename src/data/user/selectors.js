import * as AT from "data/rootActionTypes";

export const getUserSession = state => state.user.userSession;

export const getUserId = state => state.user.userSession?.id;

export const getWhoAmI = state => state.user[AT.WHO_AM_I];

export const getLoginStatus = state => state.user[AT.LOG_IN];
export const getRegisterStatus = state => state.user[AT.REGISTER];
