import { socialApiClient } from "../client";
import axios from "axios";

export const api = {
  signS3: async fileInfo => {
    return await socialApiClient
      .post("api/aws/signS3", fileInfo)
      .catch(error => {
        throw Error(error.message);
      });
  },
  uploadImage: async uploadInfo => {
    const { signedRequest, file, options } = uploadInfo;
    return await axios.put(signedRequest, file, options).catch(error => {
      throw Error(error.message);
    });
  }
};
