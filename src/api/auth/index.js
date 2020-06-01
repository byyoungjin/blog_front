import { socialApiClient } from "api/client";

export const api = {
  login: async userLoginInfo => {
    console.log("userLoginInfo", userLoginInfo);
    return await socialApiClient
      .post("api/auth/login", userLoginInfo)
      .catch(error => {
        console.log("error", error);
        throw Error(error.message);
      });
  },
  register: async userRegisterInfo => {
    return await socialApiClient
      .post("api/auth/register", userRegisterInfo)
      .catch(error => {
        throw Error(error.message);
      });
  },
  whoAmI: async () => {
    return await socialApiClient.get("api/auth/whoAmI").catch(error => {
      throw Error(error.message);
    });
  }
};
