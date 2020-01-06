import React from "react";
import styled from "styled-components";
import { convertToRaw, convertFromRaw, EditorState } from "draft-js";

function PostHeader({
  className,
  editorTitleState,
  editorContentState,
  setEditorTitleState,
  setEditorContentState
}) {
  const getContentAsRawJson = editorState => () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    return JSON.stringify(raw, null, 2);
  };

  const saveContent = () => {
    const titleJson = getContentAsRawJson(editorTitleState)();
    const contentJson = getContentAsRawJson(editorContentState)();
    localStorage.setItem("DraftEditorTitleJson", titleJson);
    localStorage.setItem("DraftEditorContentJson", contentJson);
  };

  const loadContent = item => () => {
    const savedData = localStorage.getItem(item);
    return savedData ? JSON.parse(savedData) : null;
  };

  const populateEditorState = (item, setEditorState) => () => {
    const rawEditorData = loadContent(item)();
    if (rawEditorData !== null) {
      const contentState = convertFromRaw(rawEditorData);
      const newEditorState = EditorState.createWithContent(contentState);
      setEditorState(newEditorState);
    }
  };
  return (
    <div className={className}>
      <StyledButton onClick={() => saveContent()}>저장</StyledButton>
      <StyledButton
        onClick={() => {
          populateEditorState("DraftEditorTitleJson", setEditorTitleState)();
          populateEditorState(
            "DraftEditorContentJson",
            setEditorContentState
          )();
        }}
      >
        불러오기
      </StyledButton>
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
