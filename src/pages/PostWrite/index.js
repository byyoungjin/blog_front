import React, { useState } from "react";
import styled from "styled-components";
import { Editor, EditorState } from "draft-js";
import "./draft.css";

import * as pallete from "styleVariables";

export default function PostWrite() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <>
      <StyledPostHeader></StyledPostHeader>
      <Editor editorState={editorState} onChange={setEditorState} />
    </>
  );
}

const PostHeader = ({ className }) => {
  return <div className={className}>저장</div>;
};

const StyledPostHeader = styled(PostHeader)`
  background-color: ${pallete.backgroundGrey};
`;
