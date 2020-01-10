import { socialApiClient } from "api/client";

export const api = {
  login: async userLoginInfo => {
    return await socialApiClient
      .post("/api/auth/login", userLoginInfo)
      .catch(error => {
        throw Error(error.message);
      });
  },
  register: async userRegisterInfo => {
    return await socialApiClient
      .post("api/auth/register", userRegisterInfo)
      .catch(error => {
        throw Error(error.message);
      });
  }
};
