import { api as authApi } from "./auth";
import { api as userApi } from "./user";
import { api as postApi } from "./post";
import { api as awsApi } from "./aws";
import { api as unSplashApi } from "./unSplash";
import { api as tagApi } from "./tag";
import { api as postTagApi } from "./postTag";

const api = {
  authApi,
  userApi,
  postApi,
  awsApi,
  unSplashApi,
  tagApi,
  postTagApi
};
export default api;
