import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { socialApiClient } from "api/client";

export const api = {
  getPostsOfUser: async userId => {
    const res = await socialApiClient.get(`/api/post/getPosts/${userId}`);
    return res.data.posts;
  },
  getPostById: async postId => {
    const res = await socialApiClient.get(`/api/post/getPost/${postId}`);
    console.log("res", res);
    const post = res.data.post;
    const convertFromRawPost = {
      editorContentState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(post.editorContentState))
      ),
      editorTitleState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(post.editorTitleState))
      ),
      UserId: post.UserId
    };
    console.log("convertFromRawPost", convertFromRawPost);
    return convertFromRawPost;
  },
  createPost: async postContent => {
    const convertToRawPost = {
      editorContentState: JSON.stringify(
        convertToRaw(postContent.editorContentState.getCurrentContent())
      ),
      editorTitleState: JSON.stringify(
        convertToRaw(postContent.editorTitleState.getCurrentContent())
      ),
      UserId: postContent.UserId
    };
    console.log("convertToRawPost", convertToRawPost);
    const res = await socialApiClient.post("api/post/createPost", {
      ...convertToRawPost
    });
    return res;
  },
  deletePost: async postId => {
    const res = await socialApiClient.post(`api/post/deletePost/${postId}`);
    return res;
  },
  updatePost: async ({ postId, newPost }) => {
    const res = await socialApiClient.put(`api/post/updatePost/${postId}`, {
      ...newPost
    });
    return res;
  }
};
