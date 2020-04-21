import React, { useRef } from "react";
import { useSelector } from "react-redux";

import BasicEditor from "./BasicEditor";
import Controller from "./Controller";
import { selectors } from "data";
import useEditorState from "./hooks";
import useModal from "hooks/useModal";
import { saveContent } from "./helper";

export default function MyEditor() {
  const userSession = useSelector(selectors.user.getUserSession);
  const { id } = userSession;
  const [editorState, setEditorState] = useEditorState(id);

  const editorRef = useRef();
  const { modalUpAndGo } = useModal();

  const saveHandler = () => {
    saveContent({ editorState, id });
    modalUpAndGo();
  };

  return (
    <>
      <Controller saveHandler={saveHandler} />
      <BasicEditor
        editorState={editorState}
        setEditorState={setEditorState}
        editorRef={editorRef}
        saveHandler={saveHandler}
      />
    </>
  );
}
