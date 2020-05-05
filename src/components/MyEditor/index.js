import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import BasicEditor from "./BasicEditor";
import Controller from "./Controller";
import { selectors, actions } from "data";
import { useEditorState, usePublishContent, useUpdateContent } from "./hooks";
import { useModal } from "hooks/useModal";
import { saveContent, getTitlePhotoFrom } from "./helper";

export default function MyEditor({
  readOnly,
  editorState,
  setEditorState,
  id
}) {
  const dispatch = useDispatch();

  const postUserId = useSelector(selectors.post.getCurrentPostUserId);
  const title = useSelector(selectors.editorState.getTitle);
  const subTitle = useSelector(selectors.editorState.getSubTitle);
  const titlePhoto = useSelector(selectors.editorState.getTitlePhoto);
  const postId = useSelector(selectors.post.getCurrentPostId);

  const { publish, setTitlePhoto } = usePublishContent({
    editorState,
    UserId: id,
    title,
    subTitle,
    titlePhoto
  });

  const update = useUpdateContent({
    postId,
    newPost: {
      editorState,
      UserId: id,
      title,
      subTitle,
      titlePhoto
    }
  });
  const isSameUser = id ? id === postUserId : false;

  const editorRef = useRef();
  const { modalUpAndGo, setUpModal, setDownModal } = useModal();

  const saveHandler = () => {
    saveContent({ editorState, id });
    modalUpAndGo({ content: "saved!" });
  };
  const publishHandler = () => {
    publish();
    modalUpAndGo({ content: "published!" });
  };

  const editHandler = postId => {
    dispatch(actions.router.push(`/postEdit/${postId}`));
  };

  const confirmEdithandler = () => {
    update();
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

  const res = getTitlePhotoFrom(editorState);
  console.log("res", res);

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
