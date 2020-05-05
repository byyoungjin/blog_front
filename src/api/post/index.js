import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { socialApiClient } from "api/client";

export const api = {
  getPostsOfUser: async userId => {
    const res = await socialApiClient.get(`/api/post/getPosts/${userId}`);
    return res.data.posts;
  },
  getAllPosts: async () => {
    const res = await socialApiClient.get(`/api/post/getAllPosts`);
    return res.data.posts;
  },
  getPostById: async postId => {
    const res = await socialApiClient.get(`/api/post/getPost/${postId}`);
    const rawPost = res.data;
    const convertFromRawPost = getConvertFromRawPost(rawPost);
    return convertFromRawPost;
  },
  createPost: async postContent => {
    const convertToRawPost = getConvertToRawPost(postContent);
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
    const convertToRawPost = getConvertToRawPost(newPost);
    const res = await socialApiClient.put(`api/post/updatePost/${postId}`, {
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
