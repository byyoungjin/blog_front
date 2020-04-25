import { useDispatch } from "react-redux";
import { RichUtils, EditorState, AtomicBlockUtils } from "draft-js";

import { actions } from "data";

export const useInsertHandlers = editorState => {
  const dispatch = useDispatch();

  const insertDashHandler = () => {
    dispatch(actions.editorState.addAtomicBlock({ editorState, type: "dash" }));
  };

  const insertCodeHandler = () => {
    dispatch(
      actions.editorState.toggleBlock({ editorState, type: "code-block" })
    );
  };

  const insertSearchHandler = () => {};

  const insertVideoHandler = () => {
    dispatch(
      actions.editorState.addAtomicBlock({ editorState, type: "youtube" })
    );
  };

  return [
    insertDashHandler,
    insertCodeHandler,
    insertSearchHandler,
    insertVideoHandler
  ];
};