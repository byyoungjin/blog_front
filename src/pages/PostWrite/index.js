import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectors, actions } from "data";
import { MyEditor } from "components";
import { useEditorState } from "components/MyEditor/hooks";

export default function PostWriteComp() {
  const dispatch = useDispatch();
  const userSession = useSelector(selectors.user.getUserSession);
  const { id } = userSession;
  const [editorState, setEditorState] = useEditorState(id);

  useEffect(() => {
    dispatch(actions.editorState.populateEditorState());

    return () => {
      dispatch(actions.editorState.resetEditorState());
    };
  }, []);
  return (
    <MyEditor
      editorState={editorState}
      setEditorState={setEditorState}
      id={id}
    />
  );
}
