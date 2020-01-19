import React, { memo } from "react";
import styled from "styled-components";
import { Editor } from "draft-js";

const MyEditorTitle = memo(
  ({ editorState, setEditorState, handleKeyCommand, readOnly = false }) => {
    return (
      <StyledEditorTitle>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          handleKeyCoKmmand={
            handleKeyCommand
              ? handleKeyCommand(editorState, setEditorState)
              : null
          }
          placeholder={"제목을 입력하세요..."}
          readOnly={readOnly}
        />
      </StyledEditorTitle>
    );
  }
);

const StyledEditorTitle = styled.div`
  width: 80%;
  content: "제목을 입력하세요";
  font-size: 38pt;
  font-family: Nanum Myeongjo;
  cursor: text;
  opacity: 0.6;
`;

export default MyEditorTitle;
