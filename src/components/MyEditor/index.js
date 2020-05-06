import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BasicEditor from "./BasicEditor";
import Controller from "./Controller";
import { selectors, actions } from "data";
import { useModal } from "hooks/useModal";
import { saveContent } from "./helper";

export default function MyEditor({
  readOnly,
  editorState,
  setEditorState,
  id
}) {
  const dispatch = useDispatch();
  const postUserId = useSelector(selectors.post.getCurrentPostUserId);
  const isSameUser = id ? id === postUserId : false;

  const editorRef = useRef();
  const { modalUpAndGo, setUpModal, setDownModal } = useModal();

  const saveHandler = () => {
    saveContent({ editorState, id });
    dispatch(actions.modal.modalUpAndGo("saved!"));
  };
  const publishHandler = () => {
    dispatch(actions.post.createPost());
  };

  const editHandler = postId => {
    dispatch(actions.router.push(`/postEdit/${postId}`));
  };

  const confirmEdithandler = () => {
    dispatch(actions.post.updatePost());
  };

  const deleteHandler = postId => {
    setUpModal({ modalType: "DELETE_POST", modalProps: { postId } });
  };

  const handlers = {
    saveHandler,
    publishHandler,
    editHandler,
    deleteHandler,
    confirmEdithandler
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
