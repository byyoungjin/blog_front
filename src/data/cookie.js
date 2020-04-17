import Cookies from "js-cookie";

const API_TOKEN = "API_TOKEN";

// TODO : set cookie httpOnly
export const setAuthCookie = userSession => {
  Cookies.set(API_TOKEN, userSession);
};

export const getAuthCookie = () => {
  return Cookies.getJSON(API_TOKEN);
};

export const clearAuthCookie = () => {
  Cookies.remove(API_TOKEN);
};
