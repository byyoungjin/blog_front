import React, { useState, useEffect, useRef, useCallback } from "react";
import styled from "styled-components";
import {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw
} from "draft-js";

import SideBar from "./SideBar";
import UpperBar from "./UpperBar";
import { colors } from "theme";

const { hasCommandModifier } = KeyBindingUtil;

export default function BasicEditor({
  editorState,
  setEditorState,
  editorRef,
  ...props
}) {
  const focusOnEditor = useCallback(() => editorRef.current.focus(), [
    editorRef
  ]);

  useEffect(() => {
    focusOnEditor();
  }, [focusOnEditor]);

  const onChangeHandler = editorState => setEditorState(editorState);

  const myKeybindingFn = e => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === "myeditor-save") {
      console.log("saved!");
    }
    if (newState) {
      onChangeHandler(newState);
      return "handled";
    }
    return "not-handled";
  };

  const logCurrentBlock = () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    console.log(JSON.stringify(raw, null, 2));
  };

  return (
    <EditorWrapper onClick={focusOnEditor}>
      {/* <button onMouseDown={logCurrentBlock}>log</button> */}
      <Editor
        editorState={editorState}
        onChange={onChangeHandler}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={myKeybindingFn}
        ref={editorRef}
        {...props}
      />
      <SideBar editorState={editorState} />
      <UpperBar editorState={editorState} />
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  width: 100%;

  padding: 20px;
  grid-area: editor;
  position: relative;
  font-size: 24px;
  color: ${colors.black_84};
`;
