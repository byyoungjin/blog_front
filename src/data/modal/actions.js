import * as AT from "data/rootActionTypes";

export const setModalUp = modal => ({
  type: AT.SET_MODAL_UP,
  modal
});

export const setModalDown = () => ({
  type: AT.SET_MODAL_DOWN
});
