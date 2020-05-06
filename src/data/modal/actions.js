import * as AT from "data/rootActionTypes";

export const setModalUp = ({ modalType, modalProps }) => ({
  type: AT.SET_MODAL_UP,
  modalType,
  modalProps
});

export const setModalDown = () => ({
  type: AT.SET_MODAL_DOWN
});

export const modalUpAndGo = content => ({
  type: AT.MODAL_UP_AND_GO,
  content
});
