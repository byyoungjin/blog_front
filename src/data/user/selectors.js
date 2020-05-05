import * as AT from "data/rootActionTypes";

export const getUserSession = state => state.user.userSession;

export const getUserId = state => state.user.userSession?.id;

export const getWhoAmI = state => state.user[AT.WHO_AM_I];
