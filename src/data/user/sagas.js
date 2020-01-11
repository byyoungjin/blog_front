import { put, call } from "redux-saga/effects";
import { actions } from "data";
import { setAuthCookie, getAuthCookie, clearAuthCooie } from "data/cookie";
import api from "api";

export function* login(data) {
  yield put(actions.user.loginLoading());

  const { emailAddress, password } = data;
  const userSession = yield api.authApi.login(data);
  console.log("userSession", userSession);
  yield put(actions.user.setUserSession(userSession));
  setAuthCookie(userSession.apiToken);
}
