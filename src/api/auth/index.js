import { socialApiClient } from "api/client";

export const api = {
  registerTraditional: async userRegisterInfo => {
    return await socialApiClient.post(
      "api/auth/registerTraditional",
      userRegisterInfo
    );
  },
  loginTraditional: async userLoginInfo => {
    return await socialApiClient.post(
      "api/auth/loginTraditional",
      userLoginInfo
    );
  },
  logout: async () => {
    return await socialApiClient.get("api/auth/logout");
  },

  whoAmI: async () => {
    return await socialApiClient.get("api/auth/whoAmI");
  }
};
