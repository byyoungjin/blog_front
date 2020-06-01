import { socialApiClient } from "api/client";

export const api = {
  getAllTags: async () => {
    return await socialApiClient.get("api/tag/all").catch(err => {
      console.log("err", err);
      throw Error(err.message);
    });
  },
  createTag: async tagInfo => {
    return await socialApiClient
      .post("api/tag/findOrCreate", tagInfo)
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
    return await socialApiClient.delete(`api/tag/tagId/${tagId}`);
  },
  getTagsOfPostId: async ({ postId }) => {
    return await socialApiClient.get(`/api/tag/postId/${postId}`);
  }
};
