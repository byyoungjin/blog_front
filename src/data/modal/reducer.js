import produce from "immer";

import * as AT from "data/rootActionTypes";

const INITIAL_VALUES = {
  up: false,
  content: null
};

export default produce((draft, action) => {
  switch (action.type) {
    case AT.SET_MODAL_UP:
      draft.up = true;
      draft.content = action.content;
      break;
    case AT.SET_MODAL_DOWN:
      draft.up = false;
      draft.content = null;
      break;
    default:
      return;
  }
}, INITIAL_VALUES);
