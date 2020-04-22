import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw
} from "draft-js";

import { actions, selectors } from "data";
import { readFile } from "./helper";
import SideBar from "./SideBar";
import UpperBar from "./UpperBar";
import { colors } from "theme";
import Media from "./Media";

const { hasCommandModifier } = KeyBindingUtil;

export default function BasicEditor({
  editorState,
  setEditorState,
  editorRef,
  saveHandler,
  ...props
}) {
  const dispatch = useDispatch();
  const userId = useSelector(selectors.user.getUserId);
  const focusOnEditor = useCallback(() => editorRef.current.focus(), [
    editorRef
  ]);

  useEffect(() => {
    focusOnEditor();
  }, [focusOnEditor]);

  const myKeybindingFn = e => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (command === "myeditor-save") {
      saveHandler();
    }
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const mediaBlockRenderer = block => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false
      };
    }
    return null;
  };

  const handlePastedFilesFn = files => {
    const onLoadHandler = selectedFile =>
      dispatch(
        actions.editorState.addImage({ selectedFile, editorState, userId })
      );
    readFile({ files, onLoadHandler });
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
        onChange={setEditorState}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={myKeybindingFn}
        ref={editorRef}
        blockRendererFn={mediaBlockRenderer}
        handlePastedFiles={handlePastedFilesFn}
        {...props}
      />
      <SideBar />
      <UpperBar editorRef={editorRef} />
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  width: 100%;

  padding: 20px;
  grid-area: editor;

  font-size: 24px;
  color: ${colors.black_84};
`;
