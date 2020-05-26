import { socialApiClient } from "api/client";

export const api = {
  getAllTags: async () => {
    return await socialApiClient.get("api/tag/allTags").catch(err => {
      console.log("err", err);
      throw Error(err.message);
    });
  },
  createTag: async tagInfo => {
    return await socialApiClient
      .post("api/tag/findOrCreateTag", tagInfo)
      .catch(err => {
        console.log("err", err);
        throw Error(err.message);
      });
  },
  isInTags: async tagInfo => {
    return await socialApiClient
      .post("api/tag/isInTags", tagInfo)
      .catch(err => {
        console.log("err", err);
        throw Error(err.message);
      });
  },
  deleteTag: async ({ tagId }) => {
    return await socialApiClient.delete(`api/tag/deleteTag/${tagId}`);
  },
  getTagsOfPostId: async ({ postId }) => {
    return await socialApiClient.get(`/api/tag/tagsOfPostId/${postId}`);
  }
};
