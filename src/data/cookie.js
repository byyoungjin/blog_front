import Cookies from "js-cookie";

const API_TOKEN = "apiToken";

export const setAuthCookie = apiToken => {
  Cookies.set(API_TOKEN, apiToken);
};

export const getAuthCookie = () => {
  return Cookies.get(API_TOKEN);
};

export const clearAuthCooie = () => {
  Cookies.remove(API_TOKEN);
};
