import { socialApiClient } from "api/client";

export const api = {
  mapPostTag: async postTagInfo => {
    return await socialApiClient
      .post("api/postTag/findOrMap", postTagInfo)
      .catch(error => {
        console.log("error", error);
        throw Error(error.message);
      });
  },
  deleteMaping: async postTagInfo => {
    const { tagId, postId } = postTagInfo;
    return await socialApiClient
      .delete(`/api/postTag/postId/${postId}/tagId/${tagId}`)
      .catch(error => {
        console.log("error", error);
        throw Error(error.message);
      });
  }
};
