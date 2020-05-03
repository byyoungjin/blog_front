import React from "react";
import { useSelector } from "react-redux";

import { selectors } from "data";
import { MyEditor } from "components";
import { useEditorState } from "components/MyEditor/hooks";

export default function PostWriteComp() {
  const userSession = useSelector(selectors.user.getUserSession);
  const { id } = userSession;
  const [editorState, setEditorState] = useEditorState(id);
  return (
    <MyEditor
      editorState={editorState}
      setEditorState={setEditorState}
      id={id}
    />
  );
}
