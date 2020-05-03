import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";

export default function PostTitle() {
  const dispatch = useDispatch();
  const title = useSelector(selectors.editorState.getTitle);
  const toggleReadOnly = bool => {
    dispatch(actions.editorState.toggleEditorReadOnly(bool));
  };

  const changeHandler = e => {
    e.preventDefault();
    dispatch(actions.editorState.setTitle(e.target.value));
  };

  return (
    <MyEditorInput
      onChange={changeHandler}
      value={title}
      onFocus={toggleReadOnly.bind(this, true)}
      onBlur={toggleReadOnly.bind(this, false)}
      placeholder="제목"
    />
  );
}

const MyEditorInput = styled.input`
  border: none;
  font-size: 32px;
  outline: none;
`;
