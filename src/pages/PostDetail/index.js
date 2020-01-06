import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
  convertFromRaw
} from "draft-js";
import "medium-draft/lib/index.css";

import * as pallete from "styleVariables";

export default function PostWrite() {
  const [editorTitleState, setEditorTitleState] = useState(
    EditorState.createEmpty()
  );
  const [editorContentState, setEditorContentState] = useState(
    EditorState.createEmpty()
  );

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

  useEffect(() => {
    populateEditorState("DraftEditorTitleJson", setEditorTitleState)();
    populateEditorState("DraftEditorContentJson", setEditorContentState)();
  }, []);

  return (
    <StyledEditorContainer>
      <StyledEditorTitle>
        <Editor editorState={editorTitleState} readOnly={true} />
      </StyledEditorTitle>

      <StyledEditorContent>
        <Editor editorState={editorContentState} readOnly={true} />
      </StyledEditorContent>
    </StyledEditorContainer>
  );
}

const PostHeader = ({ className, saveContent, setEditorState }) => {
  return (
    <div className={className}>
      <StyledButton onClick={() => saveContent()}>저장</StyledButton>
      <StyledButton onClick={() => setEditorState()}>불러오기</StyledButton>
    </div>
  );
};

const StyledEditorContainer = styled.div`
  margin-top: 30px
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledEditorTitle = styled.div`
  width: 80%;
  content: "제목을 입력하세요";
  font-size: 38pt;
  font-family: Nanum Myeongjo;
  cursor: text;
  opacity: 0.6;
`;

const StyledEditorContent = styled.div`
  width: 80%;
  .DraftEditor-root {
    margin: 20px 10px 10px 10px;
    // border: 1px solid;
  }
  .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: "Inconsolata", "Menlo", "Consolas", monospace;
    font-size: 16px;
    padding: 20px;
  }
`;

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
