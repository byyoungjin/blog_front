import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { socialApiClient } from "api/client";
import { compositeDecorator } from "components/MyEditor/decorators";

export const api = {
  getPostsOfUser: async userId => {
    const res = await socialApiClient.get(`/api/post/userId/${userId}`);
    return res.data.posts;
  },
  getAllPosts: async () => {
    const res = await socialApiClient.get(`/api/post/all`);
    return res.data.posts;
  },
  getPostsByTagId: async tagId => {
    const res = await socialApiClient
      .get(`api/post/tagId/${tagId}`)
      .catch(err => {
        console.log("err", err);
        throw Error(err.message);
      });
    return res.data.posts;
  },
  getPostById: async postId => {
    const res = await socialApiClient.get(`/api/post/postId/${postId}`);
    const rawPost = res.data;
    const convertFromRawPost = getConvertFromRawPost(rawPost);
    return convertFromRawPost;
  },
  createPost: async postContent => {
    const convertToRawPost = getConvertToRawPost(postContent);
    const res = await socialApiClient.post("api/post/create", {
      ...convertToRawPost
    });
    return res;
  },
  deletePost: async postId => {
    const res = await socialApiClient.delete(`api/post/postId/${postId}`);
    return res;
  },
  updatePost: async ({ postId, newPost }) => {
    const convertToRawPost = getConvertToRawPost(newPost);
    const res = await socialApiClient.put(`api/post/postId/${postId}`, {
      ...convertToRawPost
    });
    return res;
  }
};

const getConvertToRawPost = postContent => {
  return {
    ...postContent,
    editorState: JSON.stringify(
      convertToRaw(postContent.editorState.getCurrentContent())
    )
  };
};

const getConvertFromRawPost = rawPostContent => ({
  ...rawPostContent,
  editorState: EditorState.createWithContent(
    convertFromRaw(JSON.parse(rawPostContent.editorState))
  )
});
