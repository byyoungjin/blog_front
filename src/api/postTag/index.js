import { socialApiClient } from "api/client";

export const api = {
  mapPostTag: async postTagInfo => {
    return await socialApiClient
      .post("api/postTag/mapPostTag", postTagInfo)
      .catch(error => {
        console.log("error", error);
        throw Error(error.message);
      });
  }
};
