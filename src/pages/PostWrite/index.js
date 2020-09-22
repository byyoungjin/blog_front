import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { actions } from "data";
import { MyEditor } from "components";

export default function PostWriteComp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.editorState.populateEditorState());

    return () => {
      dispatch(actions.editorState.resetEditorState());
    };
  }, [dispatch]);
  return <MyEditor />;
}
