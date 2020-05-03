import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";

export default function PostSubTitle() {
  const dispatch = useDispatch();
  const subTitle = useSelector(selectors.editorState.getSubTitle);
  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
  };

  const changeHandler = e => {
    e.preventDefault();
    dispatch(actions.editorState.setSubTitle(e.target.value));
  };

  return (
    <MyEditorInput
      onChange={changeHandler}
      value={subTitle}
      onFocus={toggleReadOnly.bind(this, true)}
      onBlur={toggleReadOnly.bind(this, false)}
      placeholder="부제목"
    />
  );
}

const MyEditorInput = styled.input`
  border: none;
  font-size: 28px;
  outline: none;
`;
