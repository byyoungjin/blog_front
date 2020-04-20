import React from "react";
import styled from "styled-components";

import ProfilePicture from "../../ProfilePicture";

import { colors } from "theme";
import { saveContent } from "../helper";

export default function ControllerComp({
  userSession,
  editorState,
  modalUpAndGo
}) {
  const { id } = userSession;
  const saveHandler = () => {
    saveContent({ editorState, id });
    modalUpAndGo();
  };
  const publishHandler = () => {
    console.log("id", id);
  };

  return (
    <Controller>
      <Button onClick={saveHandler}>SAVE</Button>
      <Button onClick={publishHandler}>PUBLISH</Button>
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
