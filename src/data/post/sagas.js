import { put, select } from "redux-saga/effects";

import { actions, selectors } from "data";
import api from "api";
import { getTitlePhotoFrom } from "./helper";

export function* createPost() {
  try {
    const editorState = yield select(selectors.editorState.getEditorState);
    const UserId = yield select(selectors.user.getUserId);
    const titlePhotoUrl = getTitlePhotoFrom(editorState);
    yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));

    const title = yield select(selectors.editorState.getTitle);
    const subTitle = yield select(selectors.editorState.getSubTitle);
    const titlePhoto = yield select(selectors.editorState.getTitlePhoto);

    const postStates = {
      editorState,
      UserId,
      title,
      subTitle,
      titlePhoto
    };
    console.log("postStates", postStates);
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
    yield put(actions.editorState.toggleEditorReadOnly(true));
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
    let posts;
    if (userId) {
      posts = yield api.postApi.getPostsOfUser(userId);
    } else {
      posts = yield api.postApi.getAllPosts();
    }
    yield put(actions.post.getPostsSuccess(posts));
  } catch (error) {
    yield put(actions.post.getPostsFailure(error));
  }
}

export function* updatePost() {
  const editorState = yield select(selectors.editorState.getEditorState);
  const titlePhotoUrl = getTitlePhotoFrom(editorState);
  yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));

  const UserId = yield select(selectors.user.getUserId);
  const title = yield select(selectors.editorState.getTitle);
  const subTitle = yield select(selectors.editorState.getSubTitle);
  const titlePhoto = yield select(selectors.editorState.getTitlePhoto);
  const postId = yield select(selectors.post.getCurrentPostId);

  const newPost = {
    editorState,
    UserId,
    title,
    subTitle,
    titlePhoto
  };
  yield api.postApi.updatePost({ postId, newPost });
  yield put(actions.post.getOnePost(postId));
}

export function* deletePost(action) {
  const { postId } = action;
  yield api.postApi.deletePost(postId);
  yield put(actions.router.push("/"));
}
