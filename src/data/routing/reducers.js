import produce from "immer";

import * as AT from "./actionTypes";

const INITIAL_STATE = {
  isMounted: false
};

const routing = produce((draft, action) => {
  switch (action.type) {
    case AT.SET_IS_MOUNTED:
      draft.isMounted = action.payload;
      break;
    default:
      return;
  }
}, INITIAL_STATE);

export default routing;
