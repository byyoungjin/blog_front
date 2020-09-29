import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { actions } from "data";
import { MyEditor } from "components";

export default function PostWriteTryComp() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.editorState.setEditorType("writeTry"));

    return () => {
      dispatch(actions.editorState.resetEditorState());
    };
  }, [dispatch]);
  return <MyEditor />;
}
