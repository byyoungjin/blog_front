import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import { actions } from "data";
import { MyEditor } from "components";

export default function PostWriteComp() {
  const dispatch = useDispatch();
  const editorRef = useRef(null);
  const focusOnEditor = () => editorRef.current.focus();

  useEffect(() => {
    dispatch(actions.editorState.populateEditorState({ focusOnEditor }));

    return () => {
      dispatch(actions.editorState.resetEditorState());
    };
  }, [dispatch]);
  return <MyEditor ref={editorRef} />;
}
