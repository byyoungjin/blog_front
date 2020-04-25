import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  Editor,
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
  DefaultDraftBlockRenderMap
} from "draft-js";
import Immutable from "immutable";

import { actions, selectors } from "data";
import { readFile } from "./helper";
import SideBar from "./SideBar";
import UpperBar from "./UpperBar";
import { colors } from "theme";
import Media from "./Media";
import Code from "./Blocks/Code";
import Youtube from "./Blocks/YouTube";

import log from "utils/log";

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
  const readOnly = useSelector(selectors.editorState.getEditorReadOnly);
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
    const type = block.getType();
    switch (type) {
      case "atomic":
        return {
          component: Media,
          editable: false
        };
      default:
        return null;
    }
  };
  const blockRenderMap = Immutable.Map({
    "code-block": {
      element: "div",
      wrapper: <Code />
    }
  });

  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    blockRenderMap
  );

  const handlePastedFilesFn = files => {
    const onLoadHandler = selectedFile =>
      dispatch(
        actions.editorState.addImage({ selectedFile, editorState, userId })
      );
    readFile({ files, onLoadHandler });
  };

  const logCurrentBlock = () => {
    log(editorState);
  };

  return (
    <EditorWrapper onClick={focusOnEditor}>
      <button onMouseDown={logCurrentBlock}>log</button>
      <Editor
        editorState={editorState}
        onChange={editorState => setEditorState(editorState)}
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={myKeybindingFn}
        ref={editorRef}
        blockRendererFn={mediaBlockRenderer}
        blockRenderMap={extendedBlockRenderMap}
        handlePastedFiles={handlePastedFilesFn}
        readOnly={readOnly}
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
