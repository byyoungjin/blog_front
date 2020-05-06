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
    setUpModal(
      <>
        <div>이 포스트를 삭제하시겠습니까?</div>
        <button onClick={confirmDelete.bind(this, postId)}>네</button>
        <button onClick={setDownModal}>아니오</button>
      </>
    );
  };

  const confirmDelete = postId => {
    dispatch(actions.post.deletePost(postId));
    setDownModal();
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
