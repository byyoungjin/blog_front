import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BasicEditor from "./BasicEditor";
import Controller from "./Controller";
import { selectors, actions } from "data";
import { useEditorState } from "./hooks";
import useModal from "hooks/useModal";
import { saveContent } from "./helper";

export default function MyEditor({ readOnly }) {
  const dispatch = useDispatch();
  const userSession = useSelector(selectors.user.getUserSession);
  const postUserId = useSelector(selectors.post.getCurrentPostUserId);
  const { id } = userSession;
  const [editorState, setEditorState] = useEditorState(id);
  const isSameUser = userSession ? userSession.id === postUserId : false;

  const editorRef = useRef();
  const { modalUpAndGo } = useModal();

  const saveHandler = () => {
    saveContent({ editorState, id });
    modalUpAndGo({ content: "saved!" });
  };
  const publishHandler = () => {
    dispatch(actions.post.createPost({ editorState, UserId: id }));
    modalUpAndGo({ content: "published!" });
  };

  const editHandler = () => {};

  const deleteHandler = () => {};

  const handlers = {
    saveHandler,
    publishHandler,
    editHandler,
    deleteHandler
  };

  return (
    <>
      <Controller
        handlers={handlers}
        readOnly={readOnly}
        isSameUser={isSameUser}
      />
      <BasicEditor
        editorState={editorState}
        setEditorState={setEditorState}
        editorRef={editorRef}
        saveHandler={saveHandler}
        readOnly={readOnly}
      />
    </>
  );
}
