import React, { useState, useRef } from "react";
import styled from "styled-components";
import { getDefaultKeyBinding, KeyBindingUtil } from "draft-js";
import PlugInsEditor from "components/Editors/PlugInsEditor";
import SideBarController from "components/Editors/SideBarController";

export default function MyEditorContent({
  editorState,
  setEditorState,
  handleKeyCommand,
  readOnly = false
}) {
  const contentState = editorState.getCurrentContent();

  return (
    <StyledEditorContent>
      <PlugInsEditor
        editorState={editorState}
        onChange={setEditorState}
        handleKeyCommand={
          handleKeyCommand
            ? handleKeyCommand(editorState, setEditorState)
            : null
        }
        keyBindingFn={myKeyBindingFn}
        customStyleMap={styleMap}
        placeholder={"내용을 입력하세요..."}
        readOnly={readOnly}
      />
      {readOnly ? null : (
        <SideBarController
          editorState={editorState}
          onChange={setEditorState}
          contentState={contentState}
        />
      )}
    </StyledEditorContent>
  );
}

const { hasCommandModifier } = KeyBindingUtil;

const myKeyBindingFn = e => {
  if (e.keyCode === 83 && hasCommandModifier(e)) {
    console.log("myeditor-save");
    return "myeditor-save";
  }
  return getDefaultKeyBinding(e);
};

const styleMap = {
  CODE: {
    backgroundColor: "#ddd",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const StyledEditorContent = styled.div`
  width: 80%;
  .DraftEditor-root {
    margin: 20px 10px 10px 10px;

    figure {
      text-align: center;
    }
    img {
      width: 60%;
    }
  }
  .public-DraftStyleDefault-pre {
    background-color: rgba(0, 0, 0, 0.05);
    font-family: "Inconsolata", "Menlo", "Consolas", monospace;
    font-size: 16px;
    padding: 20px;
  }
`;
