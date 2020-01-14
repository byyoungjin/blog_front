import { put, call } from "redux-saga/effects";
import { actions } from "data";
import { setAuthCookie, getAuthCookie, clearAuthCookie } from "data/cookie";
import api from "api";

export function* login(action) {
  try {
    const { userLoginInfo } = action;
    yield put(actions.user.loginLoading());

    // 1. get token and set it on store & cookie
    const res = yield api.authApi.login(userLoginInfo);
    const { userData } = res.data;
    yield put(actions.user.setUserSession(userData));
    setAuthCookie(userData);

    yield put(actions.user.loginSuccess(userData));
    yield put(actions.router.push("/"));
  } catch (e) {
    yield put(actions.user.loginFailure(e));
    alert(e);
  }
}

export function* logout() {
  yield put(actions.user.resetAuth());
  clearAuthCookie();
  yield put(actions.post.getPostsSuccess([]));
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
    yield put(actions.user.registerFailure());
  }
}
