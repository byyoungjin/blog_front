import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { colors } from "theme";
import { actions, selectors } from "data";

import ProfilePicture from "../../ProfilePicture";
import { saveContent } from "../helper";

export default function ControllerComp() {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const userId = useSelector(selectors.user.getUserId);
  const postUserId = useSelector(selectors.post.getCurrentPostUserId);
  const postId = useSelector(selectors.post.getCurrentPostId);
  const editorType = useSelector(selectors.editorState.getEditorType);

  const isSameUser = userId ? userId === postUserId : false;

  const saveHandler = (editorState, userId) => {
    saveContent({ editorState, id: userId });
    dispatch(actions.modal.modalUpAndGo("saved!"));
  };
  const publishHandler = () => {
    dispatch(actions.post.createPost());
    dispatch(actions.modal.modalUpAndGo("published!"));
  };

  const editHandler = postId => {
    dispatch(actions.router.push(`/postEdit/${postId}`));
  };

  const confirmEdithandler = () => {
    dispatch(actions.post.updatePost());
  };

  const deleteHandler = postId => {
    dispatch(
      actions.modal.setModalUp({
        modalType: "DELETE_POST",
        modalProps: { postId }
      })
    );
  };

  const toggleReadOnlyHandler = readOnly => {
    dispatch(actions.editorState.toggleEditorReadOnly(readOnly));
  };

  const Buttons = button => (
    <Button onMouseDown={button.onClick} key={button.title}>
      {button.title}
    </Button>
  );

  const EditorButtons = () =>
    [
      { title: "SAVE", onClick: saveHandler.bind(this, editorState, userId) },
      { title: "PUBLISH", onClick: publishHandler }
    ].map(Buttons);

  const DetailButtons = () =>
    [
      { title: "EDIT", onClick: editHandler.bind(this, postId) },
      { title: "DELETE", onClick: deleteHandler.bind(this, postId) }
    ].map(Buttons);

  const EditButtons = () =>
    [{ title: "CONFIRM EDIT", onClick: confirmEdithandler }].map(Buttons);

  const EditorTryButton = () => {
    const readOnly = useSelector(selectors.editorState.getIsReadOnly);
    return (
      <Button
        style={{ marginTop: "5px" }}
        onMouseDown={() => toggleReadOnlyHandler(!readOnly)}
      >
        {readOnly ? "EDIT MODE" : "PREVIEW"}
      </Button>
    );
  };

  const getButtons = editorType => {
    switch (editorType) {
      case "write":
        return <EditorButtons />;
      case "detail":
        return isSameUser ? <DetailButtons /> : null;
      case "edit":
        return <EditButtons />;
      case "writeTry":
        return <EditorTryButton />;
      default:
        return null;
    }
  };

  return (
    <Controller>
      {getButtons(editorType)}
      {userId && <ProfilePicture diameter="50px" />}
    </Controller>
  );
}

const Controller = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  justify-self: center;
  grid-area: controller;
`;

const Button = styled.div`
  width: 100px;
  height: 45px;
  font-size: 16px;
  color: white;
  background-color: ${colors.yellow};
  margin-right: 30px;
  text-align: center;
  line-height: 45px;
  border-radius: 20px;
  cursor: pointer;
`;
