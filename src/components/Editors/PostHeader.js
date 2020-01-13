import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { saveContent, populateEditorState } from "./helper";
import { actions, selectors } from "data";

function PostHeader({
  className,
  editorTitleState,
  editorContentState,
  setEditorTitleState,
  setEditorContentState
}) {
  const dispatch = useDispatch();
  const UserId = useSelector(selectors.user.getUserId);

  const _handleSave = () =>
    saveContent({ editorContentState, editorTitleState });

  const _handleLoad = () => {
    populateEditorState("DraftEditorTitleJson", setEditorTitleState)();
    populateEditorState("DraftEditorContentJson", setEditorContentState)();
  };

  const _handleCreator = () => {
    const postData = {
      editorTitleState,
      editorContentState,
      UserId
    };
    console.log("postData", postData);
    dispatch(actions.post.createPost(postData));
  };
  return (
    <div className={className}>
      <StyledButton onClick={_handleSave}>저장</StyledButton>
      <StyledButton onClick={_handleLoad}>불러오기</StyledButton>
      <StyledButton onClick={_handleCreator}>발행</StyledButton>
    </div>
  );
}

const StyledPostHeader = styled(PostHeader)`
  display: flex;
  justify-content: flex-end;
`;

const StyledButton = styled.button`
  border-radius: 33px;
  border: 1px solid #bbb
  color: #666;
  margin: 10px;
  font-size: 12px;
  width: 66px;
  height: 30px;
  text-align: center;
`;

export default StyledPostHeader;
