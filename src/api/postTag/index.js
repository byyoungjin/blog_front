import { socialApiClient } from "api/client";

export const api = {
  mapPostTag: async postTagInfo => {
    return await socialApiClient
      .post("api/postTag/findOrMapPostTag", postTagInfo)
      .catch(error => {
        console.log("error", error);
        throw Error(error.message);
      });
  }
};
