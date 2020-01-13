import { socialApiClient } from "api/client";

export const api = {
  getPostsOfUser: async userId => {
    const res = await socialApiClient.get(`/api/post/getPosts/${userId}`);
    return res.posts;
  },
  getPostById: async postId => {
    const res = await socialApiClient.get(`/api/post/getPost/${postId}`);
    return res.post;
  },
  createPost: async postContent => {
    const res = await socialApiClient.post("api/post/createPost", {
      ...postContent
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
