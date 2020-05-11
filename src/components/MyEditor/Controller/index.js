import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import ProfilePicture from "../../ProfilePicture";

import { colors } from "theme";
import { actions, selectors } from "data";

export default function ControllerComp({ handlers, isSameUser }) {
  const {
    saveHandler,
    publishHandler,
    editHandler,
    deleteHandler,
    confirmEdithandler
  } = handlers;
  const postId = useSelector(selectors.post.getCurrentPostId);
  const editorType = useSelector(selectors.editorState.getEditorType);

  const Buttons = button => (
    <Button onMouseDown={button.onClick} key={button.title}>
      {button.title}
    </Button>
  );

  const EditorButtons = () =>
    [
      { title: "SAVE", onClick: saveHandler },
      { title: "PUBLISH", onClick: publishHandler }
    ].map(Buttons);

  const DetailButtons = () =>
    [
      { title: "EDIT", onClick: editHandler.bind(this, postId) },
      { title: "DELETE", onClick: deleteHandler.bind(this, postId) }
    ].map(Buttons);

  const EditButtons = () =>
    [{ title: "CONFIRM EDIT", onClick: confirmEdithandler }].map(Buttons);

  const getButtons = editorType => {
    switch (editorType) {
      case "write":
        return <EditorButtons />;
      case "detail":
        return isSameUser ? <DetailButtons /> : null;
      case "edit":
        return <EditButtons />;
      default:
        return null;
    }
  };

  return (
    <Controller>
      {getButtons(editorType)}
      <ProfilePicture diameter="50px" />
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
