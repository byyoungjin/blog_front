import { put } from "redux-saga/effects";

import { actions } from "data";
import { setAuthCookie, clearAuthCookie } from "data/cookie";
import api from "api";

export function* login(action) {
  try {
    const { userLoginInfo } = action;
    yield put(actions.user.loginLoading());

    // 1. get token and set it on store & cookie
    const res = yield api.authApi.login(userLoginInfo);
    const userData = res.data;
    yield put(actions.user.setUserSession(userData));
    setAuthCookie(userData.token);

    yield put(actions.user.loginSuccess(userData));
    yield put(actions.router.push("/"));
  } catch (e) {
    yield put(actions.user.loginFailure(e));
  }
}

export function* logout() {
  yield put(actions.user.resetAuth());
  clearAuthCookie();
  yield put(actions.post.getPostsSuccess([]));
  yield put(actions.router.push("/"));
}

export function* register(action) {
  try {
    const { userRegisterInfo } = action;
    yield put(actions.user.registerLoading());
    yield api.authApi.register(userRegisterInfo);

    const userLoginInfo = {
      emailAddress: userRegisterInfo.emailAddress,
      password: userRegisterInfo.password
    };
    yield put(actions.user.login(userLoginInfo));
    yield put(actions.user.registerSuccess());
  } catch (e) {
    console.log("error", e);
    yield put(actions.user.registerFailure(e));
  }
}

export function* whoAmI() {
  try {
    yield put(actions.user.whoAmILoading());
    const res = yield api.authApi.whoAmI();
    const user = res.data;
    yield put(actions.user.setUserSession(user));
    yield put(actions.user.whoAmISuccess(user));
  } catch (e) {
    console.log("error", e);
    yield put(actions.user.whoAmIFailure(e));
  }
}
