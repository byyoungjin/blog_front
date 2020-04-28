import React from "react";
import styled from "styled-components";

import ProfilePicture from "../../ProfilePicture";

import { colors } from "theme";

export default function ControllerComp({ handlers, readOnly, isSameUser }) {
  const { saveHandler, publishHandler, editHandler, deleteHandler } = handlers;

  const Buttons = button => (
    <Button onClick={button.onClick} key={button.title}>
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
      { title: "EDIT", onClick: editHandler },
      { title: "DELETE", onClick: deleteHandler }
    ].map(Buttons);

  return (
    <Controller>
      {readOnly ? isSameUser ? <DetailButtons /> : null : <EditorButtons />}
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
