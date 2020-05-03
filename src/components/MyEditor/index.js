import React, { useRef } from "react";
import { useSelector } from "react-redux";

import BasicEditor from "./BasicEditor";
import Controller from "./Controller";
import { selectors } from "data";
import { useEditorState, usePublishContent } from "./hooks";
import useModal from "hooks/useModal";
import { saveContent } from "./helper";

export default function MyEditor({
  readOnly,
  editorState,
  setEditorState,
  id
}) {
  const postUserId = useSelector(selectors.post.getCurrentPostUserId);
  const title = useSelector(selectors.editorState.getTitle);
  const subTitle = useSelector(selectors.editorState.getSubTitle);
  const titlePhoto = useSelector(selectors.editorState.getTitlePhoto);

  const publish = usePublishContent({
    editorState,
    UserId: id,
    title,
    subTitle,
    titlePhoto
  });
  const isSameUser = id ? id === postUserId : false;

  const editorRef = useRef();
  const { modalUpAndGo } = useModal();

  const saveHandler = () => {
    saveContent({ editorState, id });
    modalUpAndGo({ content: "saved!" });
  };
  const publishHandler = () => {
    publish();
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
