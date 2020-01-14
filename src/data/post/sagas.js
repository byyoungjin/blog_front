import { put, call } from "redux-saga/effects";

import { actions } from "data";
import api from "api";

export function* createPost(action) {
  try {
    console.log("createPost saga");
    const { postStates } = action;
    console.log("postStates", postStates);
    yield api.postApi.createPost(postStates);
    console.log("post created");
  } catch (error) {
    console.log("error", error);
  }
}

export function* getOnePost(action) {
  try {
    const { postId } = action;
    yield put(actions.post.getOnePostLoading());
    const post = yield api.postApi.getPostById(postId);

    yield put(actions.post.getOnePostSuccess(post));
    yield put(actions.router.push(`/postDetail/${postId}`));
  } catch (error) {
    console.log("error", error);
    yield put(actions.post.getOnePostFailure(error));
  }
}

export function* getPosts(action) {
  try {
    const { userId } = action;
    yield put(actions.post.getPostsLoading());
    const posts = yield api.postApi.getPostsOfUser(userId);
    yield put(actions.post.getPostsSuccess(posts));
  } catch (error) {
    yield put(actions.post.getPostsFailure(error));
  }
}
