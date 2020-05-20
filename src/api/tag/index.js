import { socialApiClient } from "api/client";

export const api = {
  getAllTags: async () => {
    return await socialApiClient.get("api/tag/allTags").catch(err => {
      console.log("err", err);
      throw Error(err.message);
    });
  },
  createTag: async tagInfo => {
    return await socialApiClient.post("api/tag/newTag", tagInfo).catch(err => {
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
  }
};
