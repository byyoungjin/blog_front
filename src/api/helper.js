import { getAuthCookie } from "data/cookie";

export const socialApiRequestInterceptor = request => {
  const token = getAuthCookie();
  if (token) {
    request.headers["x-access-token"] = token;
  }
  return request;
};
