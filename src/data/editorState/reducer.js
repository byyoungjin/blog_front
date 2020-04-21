import produce from "immer";
import { EditorState } from "draft-js";

import * as AT from "data/rootActionTypes";

const INITIAL_STATE = {
  editorState: EditorState.createEmpty(),
  sideBar: { position: { transfrom: "scale(0)" }, isOpen: false },
  upperBar: { position: { transfrom: "scale(0)" } }
};

export default produce((draft, action) => {
  switch (action.type) {
    case AT.UPDATE_EDITOR_STATE:
    case AT.ADD_IMAGE_SUCCESS:
      const { newEditorState } = action.data;
      draft.editorState = newEditorState;
      break;
    case AT.UPDATE_SIDE_BAR_ISOPEN:
      draft.sideBar.isOpen = action.data;
      break;
    case AT.UPDATE_SIDE_BAR_POSITION:
      draft.sideBar.position = action.data;
      break;
    case AT.UPDATE_UPPPER_BAR_POSITION:
      draft.upperBar.position = action.data;
      break;
    default:
      return;
  }
}, INITIAL_STATE);
