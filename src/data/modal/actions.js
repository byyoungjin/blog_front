import * as AT from "data/rootActionTypes";

export const setModalUp = content => ({
  type: AT.SET_MODAL_UP,
  content
});

export const setModalDown = () => ({
  type: AT.SET_MODAL_DOWN
});

export const modalUpAndGo = content => ({
  type: AT.MODAL_UP_AND_GO,
  content
});
