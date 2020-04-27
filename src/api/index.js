import { api as authApi } from "./auth";
import { api as userApi } from "./user";
import { api as postApi } from "./post";
import { api as awsApi } from "./aws";
import { api as unSplashApi } from "./unSplash";

const api = {
  authApi,
  userApi,
  postApi,
  awsApi,
  unSplashApi
};
export default api;
