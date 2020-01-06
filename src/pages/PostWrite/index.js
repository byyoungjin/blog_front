import React, { useState, useRef } from "react";
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

const { hasCommandModifier } = KeyBindingUtil;

export default function PostWrite() {
  const [editorTitleState, setEditorTitleState] = useState(
    EditorState.createEmpty()
  );
  const [editorContentState, setEditorContentState] = useState(
    EditorState.createEmpty()
  );

  const myKeyBindingFn = e => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      console.log("myeditor-save");
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  };

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
    <StyledEditorContainer>
      <StyledPostHeader
        saveContent={saveContent}
        populateEditorState={populateEditorState}
        setEditorTitleState={setEditorTitleState}
        setEditorContentState={setEditorContentState}
      ></StyledPostHeader>

      <StyledEditorTitle>
        <Editor
          editorState={editorTitleState}
          onChange={setEditorTitleState}
          handleKeyCommand={handleKeyCommand(
            editorTitleState,
            setEditorTitleState
          )}
          placeholder={"제목을 입력하세요..."}
        />
      </StyledEditorTitle>
      <InlineStyleController
        editorState={editorContentState}
        setEditorState={setEditorContentState}
      />
      <StyledEditorContent>
        <Editor
          editorState={editorContentState}
          onChange={setEditorContentState}
          handleKeyCommand={handleKeyCommand(
            editorContentState,
            setEditorContentState
          )}
          keyBindingFn={myKeyBindingFn}
          customStyleMap={styleMap}
          placeholder={"내용을 입력하세요..."}
        />
        <SideBarController />
      </StyledEditorContent>
      <pre>{getContentAsRawJson()}</pre>
    </StyledEditorContainer>
  );
}

const styleMap = {
  CODE: {
    backgroundColor: "#ddd",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2
  }
};

const INLINE_STYLES = [
  { label: "Bold", style: "bold" },
  { label: "Italic", style: "italic" },
  { label: "Underline", style: "underline" },
  { label: "Monospace", style: "code" }
];

const handleKeyCommand = (editorState, setEditorState) => command => {
  const newEditorState = RichUtils.handleKeyCommand(editorState, command);
  if (newEditorState) {
    setEditorState(newEditorState);
    return true;
  }
  return false;
};

const InlineStyleController = ({ editorState, setEditorState }) => {
  return (
    <StyledEditorControl>
      {INLINE_STYLES.map(type => (
        <ControlButton
          label={type.label}
          style={type.style}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      ))}
    </StyledEditorControl>
  );
};

const SideBarController = () => {
  const fileInput = useRef(null);
  return (
    <>
      <input style={{ display: "none" }} type={"file"} ref={fileInput} />
      <button onClick={() => fileInput.current.click()}>이미지</button>
    </>
  );
};

const ControlButton = ({ label, style, editorState, setEditorState }) => {
  let className = "RichEditor-ControlButton";
  return (
    <span
      className={className}
      onMouseDown={() => handleKeyCommand(editorState, setEditorState)(style)}
    >
      {label}
    </span>
  );
};

const PostHeader = ({
  className,
  saveContent,
  populateEditorState,
  setEditorTitleState,
  setEditorContentState
}) => {
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
};

const StyledEditorContainer = styled.div`
  margin-top: 30px;
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

const StyledEditorControl = styled.div`
  font-family: "Helvetica", sans-serif;
  font-size: 14px;
  margin-bottom: 5px;
  user-select: none;
  .RichEditor-ControlButton {
    color: #999;
    cursor: pointer;
    margin-right: 16px;
    padding: 2px 0;
    display: inline-block;
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
