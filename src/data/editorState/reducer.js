import produce from "immer";
import { EditorState } from "draft-js";

import * as AT from "data/rootActionTypes";
import Remote from "data/remote";
import { compositeDecorator } from "../../components/MyEditor/decorators";
import { forcedSelectionEditorState } from "./helper/content";

const INITIAL_STATE = {
  editorState: forcedSelectionEditorState,
  title: "",
  titlePhoto: null,
  subTitle: "",
  sideBar: { position: { transfrom: "scale(0)" }, isOpen: false },
  upperBar: { position: { transfrom: "scale(0)" } },
  readOnly: false,
  editorType: null,
  isLinkInput: false,
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
    case AT.TOGGLE_IS_LINK_INPUT:
      draft.isLinkInput = action.data;
      break;
    case AT.SET_TITLE:
      draft.title = action.data;
      break;
    case AT.SET_TITLE_PHOTO:
      draft.titlePhoto = action.data;
      break;
    case AT.SET_SUB_TITLE:
      draft.subTitle = action.data;
      break;
    case AT.SET_EDITOR_TYPE:
      draft.editorType = action.data;
      break;

    //TODO reset editorState when PostWrite page will unmaount.
    case AT.RESET_EDITOR_STATE:
      return INITIAL_STATE;
    default:
      return;
  }
}, INITIAL_STATE);
