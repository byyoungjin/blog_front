import { put } from "redux-saga/effects";

import { actions } from "data";

import api from "api";

export function* loginTraditional(action) {
  try {
    const userLoginInfo = action.payload;
    yield put(actions.user.loginLoading());

    const res = yield api.authApi.loginTraditional(userLoginInfo);
    const userData = res.data;
    yield put(actions.user.setUserSession(userData));

    yield put(actions.user.loginSuccess(userData));
    yield put(actions.router.push("/"));
  } catch (e) {
    yield put(actions.user.loginFailure(e.response.data));
  }
}

export function* loginSocial(action) {
  try {
    const userSocialInfo = action.payload;
    yield put(actions.user.loginLoading());
    const res = yield api.authApi.loginSocial(userSocialInfo);
    const userData = res.data;
    yield put(actions.user.setUserSession(userData));
    yield put(actions.user.loginSuccess(userData));
    yield put(actions.router.push("/"));
  } catch (e) {
    yield put(actions.user.loginFailure(e.response.data));
  }
}

export function* logout() {
  yield api.authApi.logout();
  yield put(actions.post.getPostsSuccess([]));
  yield put(actions.router.push("/"));
  yield put(actions.user.resetAuth());
}

export function* registerTraditional(action) {
  try {
    const userRegisterInfo = action.payload;
    yield put(actions.user.registerLoading());
    yield api.authApi.registerTraditional(userRegisterInfo);

    const userLoginInfo = {
      emailAddress: userRegisterInfo.emailAddress,
      password: userRegisterInfo.password
    };
    yield put(actions.user.loginTraditional(userLoginInfo));
    yield put(actions.user.registerSuccess());
  } catch (e) {
    console.error(e);
    yield put(actions.user.registerFailure(e.response.data));
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
    if (e.response.data === "TokenExpiredError") {
      //Issue New Token with RefreshToken
    }

    yield put(actions.user.whoAmIFailure(e));
  }
}
