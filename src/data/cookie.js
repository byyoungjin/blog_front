import Cookies from "js-cookie";

const API_TOKEN = "apiToken";

// TODO : set cookie httpOnly
export const setAuthCookie = apiToken => {
  Cookies.set(API_TOKEN, apiToken);
};

export const getAuthCookie = () => {
  return Cookies.get(API_TOKEN);
};

export const clearAuthCookie = () => {
  Cookies.remove(API_TOKEN);
};
