import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import "medium-draft/lib/index.css";

import MyEditorContent from "components/Editors/MyEditorContent";
import MyEditorTitle from "components/Editors/MyEditorTitle";
import PostHeader from "components/Editors/PostHeader";
import { actions, selectors } from "data";

export default function PostDetail({ match }) {
  const editorTitleState = useSelector(selectors.post.getEditorTitleState);
  const editorContentState = useSelector(selectors.post.getEditorContentState);
  const { postId } = match.params;
  return (
    <StyledEditorContainer>
      <PostHeader
        editorTitleState={editorTitleState}
        editorContentState={editorContentState}
        buttons={["update", "delete", "goback"]}
        postId={postId}
      />
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
