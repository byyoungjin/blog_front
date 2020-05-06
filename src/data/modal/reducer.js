import produce from "immer";

import * as AT from "data/rootActionTypes";

const INITIAL_VALUES = {
  modalType: null,
  modalProps: {}
};

export default produce((draft, action) => {
  switch (action.type) {
    case AT.SET_MODAL_UP:
      draft.modalType = action.modalType;
      draft.modalProps = action.modalProps;
      break;
    case AT.SET_MODAL_DOWN:
      return INITIAL_VALUES;
    default:
      return;
  }
}, INITIAL_VALUES);
