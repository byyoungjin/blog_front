import * as AT from "./actionTypes";

export const setIsMounted = payload => ({
  type: AT.SET_IS_MOUNTED,
  payload
});

export const routeWithAnimation = payload => ({
  type: AT.ROUTE_WITH_ANIMATION,
  payload
});

export const unmount = () => ({
  type: AT.UNMOUNTED
});
