import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "medium-draft/lib/index.css";

import MyEditorContent from "components/Editors/MyEditorContent";
import MyEditorTitle from "components/Editors/MyEditorTitle";
import { actions, selectors } from "data";

export default function PostDetail() {
  const editorTitleState = useSelector(selectors.post.getEditorTitleState);
  const editorContentState = useSelector(selectors.post.getEditorContentState);

  return (
    <StyledEditorContainer>
      <MyEditorTitle editorState={editorTitleState} readOnly={true} />
      <MyEditorContent editorState={editorContentState} readOnly={true} />
    </StyledEditorContainer>
  );
}

const StyledEditorContainer = styled.div`
  margin-top: 30px
  display: flex;
  flex-direction: column;
  align-items: center;
`;
