import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Editor, EditorState, convertFromRaw } from "draft-js";
import "medium-draft/lib/index.css";

import MyEditorContent from "components/Editors/MyEditorContent";
import MyEditorTitle from "components/Editors/MyEditorTitle";

export default function PostDetail() {
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
