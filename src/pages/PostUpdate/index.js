import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { EditorState, RichUtils } from "draft-js";
import "medium-draft/lib/index.css";

import PostHeader from "components/Editors/PostHeader";
import MyEditorTitle from "components/Editors/MyEditorTitle";
import MyEditorContent from "components/Editors/MyEditorContent";
import InlineStyleController from "components/Editors/InlineStyleController";
import MyEditorInspector from "components/Editors/MyEditorInspector";
import { selectors, actions } from "data";

export default function PostUpdate({ match }) {
  const [editorTitleState, setEditorTitleState] = useState(
    useSelector(selectors.post.getEditorTitleState)
  );
  const [editorContentState, setEditorContentState] = useState(
    useSelector(selectors.post.getEditorContentState)
  );

  const { postId } = match.params;

  const newPost = {
    editorTitleState,
    editorContentState
  };

  return (
    <StyledEditorContainer>
      <PostHeader
        editorTitleState={editorTitleState}
        editorContentState={editorContentState}
        setEditorTitleState={setEditorTitleState}
        setEditorContentState={setEditorContentState}
        buttons={["updateCreate", "goback"]}
        postId={postId}
      />

      <MyEditorTitle
        editorState={editorTitleState}
        setEditorState={setEditorTitleState}
        handleKeyCommand={handleKeyCommand}
      />

      <InlineStyleController
        editorState={editorContentState}
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
