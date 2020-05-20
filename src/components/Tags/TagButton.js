import React from "react";
import styled from "styled-components";

export default function TagButtonComp({ tagInfo }) {
  console.log("tagInfo", tagInfo);
  const { tagName, id } = tagInfo;
  return <TagButton>{tagName}</TagButton>;
}

const TagButton = styled.div`
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  &:active {
    background-color: blue;
  }
`;
