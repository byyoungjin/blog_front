import produce from "immer";

import * as AT from "data/rootActionTypes";

const INITIAL_VALUES = {
  up: false,
  modal: null
};

export default produce((draft, action) => {
  switch (action.type) {
    case AT.SET_MODAL_UP:
      draft.up = true;
      draft.modal = action.modal;
      break;
    case AT.SET_MODAL_DOWN:
      draft.up = false;
      draft.modal = null;
      break;
    default:
      return;
  }
}, INITIAL_VALUES);
