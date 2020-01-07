import React, { useState } from "react";
import styled from "styled-components";
import { EditorState, RichUtils } from "draft-js";
import "medium-draft/lib/index.css";

import PostHeader from "components/Editors/PostHeader";
import MyEditorTitle from "components/Editors/MyEditorTitle";
import MyEditorContent from "components/Editors/MyEditorContent";
import InlineStyleController from "components/Editors/InlineStyleController";
import MyEditorInspector from "components/Editors/MyEditorInspector";

export default function PostWrite() {
  const [editorTitleState, setEditorTitleState] = useState(
    EditorState.createEmpty()
  );
  const [editorContentState, setEditorContentState] = useState(
    EditorState.createEmpty()
  );

  return (
    <StyledEditorContainer>
      <PostHeader
        editorTitleState={editorTitleState}
        editorContentState={editorContentState}
        setEditorTitleState={setEditorTitleState}
        setEditorContentState={setEditorContentState}
      />

      <MyEditorTitle
        editorState={editorTitleState}
        setEditorState={setEditorTitleState}
        handleKeyCommand={handleKeyCommand}
      />

      <InlineStyleController
        editorState={editorContentState}
        setEditorState={setEditorContentState}
        handleKeyCommand={handleKeyCommand}
      />

      <MyEditorContent
        editorState={editorContentState}
        setEditorState={setEditorContentState}
        handleKeyCommand={handleKeyCommand}
      />

      {/* <MyEditorInspector editorState={editorContentState} /> */}
    </StyledEditorContainer>
  );
}

const handleKeyCommand = (editorState, setEditorState) => command => {
  const newEditorState = RichUtils.handleKeyCommand(editorState, command);
  if (newEditorState) {
    setEditorState(newEditorState);
    return true;
  }
  return false;
};

const StyledEditorContainer = styled.div`
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
