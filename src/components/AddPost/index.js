import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { colors } from "theme";
const plus = "icons/plus.svg";

export default function AddPostComp() {
  return (
    <Link to="/postWrite">
      <AddPostImage src={plus} />{" "}
    </Link>
  );
}

const AddPostImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 30px;
  padding: 10px;
  background-color: ${colors.yellow};
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
