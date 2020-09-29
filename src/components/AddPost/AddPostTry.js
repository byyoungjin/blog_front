import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "theme";
const plus = "icons/plus.svg";

export default function AddPostComp() {
  return (
    <>
      <Link to="/postWriteTry">
        <TryOutMessage>Try out</TryOutMessage>
        <AddPostImage src={plus} />{" "}
      </Link>
    </>
  );
}

const bounce = keyframes`
0% {
  bottom: 130px;
  // height: 5px;
  // border-radius: 60px 60px 20px 20px;
  transform: scaleX(1.2);
}
35% {
  // height: 15px;
  // border-radius: 50%;
  transform: scaleX(1);
}
100% {
  bottom: 160px;
}
`;

const TryOutMessage = styled.div`
  background-color: ${({ theme }) => theme.colors.gray_light};
  padding: 5px;
  border-radius: 5px;
   position fixed;
  bottom: 130px;
  right: 20px;
  animation: ${bounce} 500ms alternate infinite ease;
  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: ${({ theme }) => theme.colors.gray_light};
    border-width: 4px;
    margin-left: -4px;
  }
`;

const AddPostImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  padding: 10px;
  background-color: ${colors.pink};
  position: fixed;
  bottom: 50px;
  right: 20px;

  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: 50px;
    height: 50px;
    border-radius: 50px;
  }
`;
