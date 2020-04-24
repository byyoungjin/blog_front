import { useDispatch } from "react-redux";
import { RichUtils, EditorState, AtomicBlockUtils } from "draft-js";

import { actions } from "data";

export const useInsertHandlers = editorState => {
  const dispatch = useDispatch();

  const insertDashHandler = () => {
    dispatch(actions.editorState.addDash({ editorState }));
  };

  const insertCodeHandler = () => {
    dispatch(
      actions.editorState.toggleBlock({ editorState, type: "code-block" })
    );
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
