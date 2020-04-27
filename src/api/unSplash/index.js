import { socialApiClient } from "../client";

export const api = {
  getPhotos: async searchInfo => {
    return await socialApiClient
      .post("api/unSplash/getPhotos", searchInfo)
      .catch(error => {
        throw Error(error.message);
      });
  }
};
