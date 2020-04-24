import { useDispatch } from "react-redux";
import { RichUtils, EditorState, AtomicBlockUtils } from "draft-js";

import { actions } from "data";

export const useInsertHandlers = editorState => {
  const dispatch = useDispatch();

  const insertDashHandler = () => {
    dispatch(actions.editorState.addBlock({ editorState, type: "dash" }));
  };

  const insertCodeHandler = () => {
    dispatch(actions.editorState.addBlock({ editorState, type: "code-block" }));
  };

  const insertSearchHandler = () => {};

  const insertVideoHandler = () => {};

  return [
    insertDashHandler,
    insertCodeHandler,
    insertSearchHandler,
    insertVideoHandler
  ];
};
