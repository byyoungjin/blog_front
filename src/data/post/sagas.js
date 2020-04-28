import { put } from "redux-saga/effects";

import { actions } from "data";
import api from "api";

export function* createPost(action) {
  try {
    const { postStates } = action;
    const res = yield api.postApi.createPost(postStates);
    console.log("res", res);
    const { createdPostId } = res.data;
    yield put(actions.post.getOnePost(createdPostId));
  } catch (error) {
    console.log("error", error);
  }
}

export function* getOnePost(action) {
  try {
    const { postId } = action;
    yield put(actions.post.getOnePostLoading());
    const post = yield api.postApi.getPostById(postId);
    console.log("post", post);

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

export function* updatePost(action) {
  const { postId, newPost } = action;
  yield api.postApi.updatePost({ postId, newPost });
  yield put(actions.post.getOnePost(postId));
}

export function* deletePost(action) {
  const { postId } = action;
  yield api.postApi.deletePost(postId);
  yield put(actions.router.push("/"));
}
