import produce from "immer";
import { EditorState } from "draft-js";

import * as AT from "data/rootActionTypes";
import Remote from "data/remote";

const INITIAL_STATE = {
  editorState: EditorState.createEmpty(),
  sideBar: { position: { transfrom: "scale(0)" }, isOpen: false },
  upperBar: { position: { transfrom: "scale(0)" } },
  readOnly: false,
  [AT.ADD_IMAGE]: Remote.NotAsked
};

export default produce((draft, action) => {
  switch (action.type) {
    case AT.UPDATE_EDITOR_STATE:
      const { newEditorState } = action.data;
      draft.editorState = newEditorState;
      break;
    case AT.ADD_IMAGE_LOADING:
      draft[AT.ADD_IMAGE] = Remote.Loading;
      break;
    case AT.ADD_IMAGE_SUCCESS:
      draft[AT.ADD_IMAGE] = Remote.Success(action.data);
      break;
    case AT.ADD_IMAGE_FAILURE:
      draft[AT.ADD_IMAGE] = Remote.Failure(action.error);
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
    case AT.TOGGLE_EDITOR_READ_ONLY:
      draft.readOnly = action.data;
      break;
    default:
      return;
  }
}, INITIAL_STATE);
