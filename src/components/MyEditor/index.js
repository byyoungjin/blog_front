import React, { useRef } from "react";
import { useSelector } from "react-redux";

import BasicEditor from "./BasicEditor";
import Controller from "./Controller";
import { selectors } from "data";
import useEditorState from "./hooks";
import useModal from "hooks/useModal";

export default function MyEditor() {
  const userSession = useSelector(selectors.user.getUserSession);
  const { id } = userSession;
  const [editorState, setEditorState] = useEditorState(id);

  const editorRef = useRef();
  const { modalUpAndGo } = useModal();

  return (
    <>
      <Controller
        userSession={userSession}
        editorState={editorState}
        modalUpAndGo={modalUpAndGo}
      />
      <BasicEditor
        editorState={editorState}
        setEditorState={setEditorState}
        editorRef={editorRef}
      />
    </>
  );
}
