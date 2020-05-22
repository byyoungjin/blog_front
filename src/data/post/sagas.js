import { put, select } from "redux-saga/effects";

import { actions, selectors } from "data";
import api from "api";
import { getTitlePhotoFrom, getPostInfoFrom, getTagsFrom } from "./helper";

export function* createPost() {
  try {
    const editorState = yield select(selectors.editorState.getEditorState);
    const UserId = yield select(selectors.user.getUserId);
    const titlePhotoUrl = getTitlePhotoFrom(editorState);
    const { title: titleInfo, subTitle: subTitleInfo } = getPostInfoFrom(
      editorState
    );

    yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));
    yield put(actions.editorState.setTitle(titleInfo));
    yield put(actions.editorState.setSubTitle(subTitleInfo));

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
    const res = yield api.postApi.createPost(postStates);
    const { createdPostId } = res.data;

    // insert tag information to database
    const tagsArray = getTagsFrom(editorState);
    console.log("tagsArray", tagsArray);

    if (tagsArray.length !== 0) {
      yield tagsArray.forEach(async tagName => {
        const res = await api.tagApi.isInTags({ tagName });
        let { tagId } = res.data;
        if (!tagId) {
          const res = await api.tagApi.createTag({ tagName });
          const { createdTagId } = res.data;
          tagId = createdTagId;
        }
        const mapPostTagRes = await api.postTagApi.mapPostTag({
          PostId: createdPostId,
          TagId: tagId
        });
        console.log("mapPostTagRes", mapPostTagRes);
      });
    }

    yield put(actions.post.getOnePostDetail(createdPostId));
    yield put(actions.modal.modalUpAndGo("published"));
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
    yield put(
      actions.editorState.updateEditorState({
        newEditorState: post.editorState
      })
    );
  } catch (error) {
    console.log("error", error);
    yield put(actions.post.getOnePostFailure(error));
  }
}

export function* getOnePostDetail(action) {
  const { postId } = action;
  yield put(actions.editorState.setEditorType("detail"));
  yield put(actions.editorState.toggleEditorReadOnly(true));
  yield put(actions.post.getOnePost(postId));
  yield put(actions.router.push(`/postDetail/${postId}`));
}

export function* getOnePostEdit(action) {
  const { postId } = action;
  yield put(actions.editorState.setEditorType("edit"));
  yield put(actions.editorState.toggleEditorReadOnly(false));
  yield put(actions.post.getOnePost(postId));
}

export function* getPosts(action) {
  try {
    const { userId, tagId } = action.payload ? action.payload : {};
    let posts;
    yield put(actions.post.getPostsLoading());
    if (!tagId) {
      if (userId) {
        posts = yield api.postApi.getPostsOfUser(userId);
      } else {
        posts = yield api.postApi.getAllPosts();
      }
    } else {
      posts = yield api.postApi.getPostsByTagId(tagId);
    }

    yield put(actions.post.getPostsSuccess(posts));
  } catch (error) {
    console.log("error.message", error.message);
    yield put(actions.post.getPostsFailure(error));
  }
}

export function* updatePost() {
  const editorState = yield select(selectors.editorState.getEditorState);
  const titlePhotoUrl = getTitlePhotoFrom(editorState);
  const { title: titleInfo, subTitle: subTitleInfo } = getPostInfoFrom(
    editorState
  );
  yield put(actions.editorState.setTitlePhoto(titlePhotoUrl));
  yield put(actions.editorState.setTitle(titleInfo));
  yield put(actions.editorState.setSubTitle(subTitleInfo));

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
  console.log("newPost", newPost);
  yield api.postApi.updatePost({ postId, newPost });
  yield put(actions.post.getOnePost(postId));
  yield put(actions.modal.modalUpAndGo("edited"));
  yield put(actions.router.push(`/postDetail/${postId}`));
}

export function* deletePost(action) {
  const { postId } = action;
  yield api.postApi.deletePost(postId);
  yield put(actions.router.push("/"));
}

export function* getAllTags(action) {
  const res = yield api.tagApi.getAllTags();
  const { tags } = res.data;
  yield put(actions.post.updateTags({ tags }));
}
