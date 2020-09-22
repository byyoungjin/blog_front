import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import { selectors, actions } from "data";

import BasicEditor from "./BasicEditor";
import Controller from "./Controller";
import { saveContent } from "./helper";

export default function MyEditor({
  readOnly,
  editorState,
  setEditorState,
  id
}) {
  const dispatch = useDispatch();
  const editorRef = useRef();
  const userId = useSelector(selectors.user.getUserId);

  const saveHandler = (editorState, userId) => {
    saveContent({ editorState, id: userId });
    dispatch(actions.modal.modalUpAndGo("saved!"));
  };

  return (
    <>
      <BasicEditor
        editorState={editorState}
        setEditorState={setEditorState}
        editorRef={editorRef}
        saveHandler={saveHandler.bind(this, editorState, userId)}
        readOnly={readOnly}
      />
    </>
  );
}
