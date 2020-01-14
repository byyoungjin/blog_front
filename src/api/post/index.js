import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import { socialApiClient } from "api/client";

export const api = {
  getPostsOfUser: async userId => {
    const res = await socialApiClient.get(`/api/post/getPosts/${userId}`);
    return res.data.posts;
  },
  getPostById: async postId => {
    const res = await socialApiClient.get(`/api/post/getPost/${postId}`);
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
    console.log("res", res);
    return res;
  }
};

const getConvertToRawPost = postContent => {
  return {
    editorContentState: JSON.stringify(
      convertToRaw(postContent.editorContentState.getCurrentContent())
    ),
    editorTitleState: JSON.stringify(
      convertToRaw(postContent.editorTitleState.getCurrentContent())
    ),
    UserId: postContent.UserId
  };
};
