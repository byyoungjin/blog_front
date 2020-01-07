import React, { useRef } from "react";
import styled from "styled-components";
import { Editor, getDefaultKeyBinding, KeyBindingUtil } from "draft-js";

export default function MyEditorContent({
  editorState,
  setEditorState,
  handleKeyCommand,
  readOnly = false
}) {
  return (
    <StyledEditorContent>
      <Editor
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
      {readOnly ? null : <SideBarController />}
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

const SideBarController = () => {
  const fileInput = useRef(null);
  const fileSelectHandler = e => {
    const selectedFile = e.target.files[0];
    console.log("selectedFile", selectedFile);
  };
  return (
    <>
      <input
        style={{ display: "none" }}
        type={"file"}
        onChange={fileSelectHandler}
        ref={fileInput}
      />
      <button onClick={() => fileInput.current.click()}>이미지</button>
    </>
  );
};

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
