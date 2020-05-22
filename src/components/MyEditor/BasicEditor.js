import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Editor from "draft-js-plugins-editor";

import { actions, selectors } from "data";

import SideBar from "./SideBar";
import UpperBar from "./UpperBar";
import { colors } from "theme";

import { emojiPlugin } from "./Plugins/emoji";
import { blockBreakoutPlugin } from "./Plugins/blockBreakOut";
import createBasicSettingsPlugin from "./Plugins/custom/basicSettings";
import EditorDetailHeader from "./EditorDetailHeader";

import log from "utils/log";

export default function BasicEditor({
  editorState,
  setEditorState,
  editorRef,
  saveHandler,
  readOnly: readOnlyForDetailView,
  ...props
}) {
  const dispatch = useDispatch();
  const userId = useSelector(selectors.user.getUserId);
  const readOnly = useSelector(selectors.editorState.getEditorReadOnly);
  const editorType = useSelector(selectors.editorState.getEditorType);
  const focusOnEditor = () => editorRef.current.focus();

  // useEffect(() => {
  //   dispatch(actions.editorState.tester());
  // });

  const logCurrentBlock = () => {
    log(editorState);
  };

  const onLoadHandler = selectedFile =>
    dispatch(
      actions.editorState.addImage({ selectedFile, editorState, userId })
    );

  const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
  const basicSettingPlugin = createBasicSettingsPlugin({
    saveHandler,
    setEditorState,
    onLoadHandler
  });

  return (
    <EditorWrapper onClick={focusOnEditor}>
      {/* <button onMouseDown={logCurrentBlock}>log</button> */}
      {editorType === "detail" && <EditorDetailHeader />}
      <Editor
        editorState={editorState}
        onChange={newEditorState =>
          setEditorState({ newEditorState, from: "EditorOnChange" })
        }
        readOnly={readOnlyForDetailView ? readOnlyForDetailView : readOnly}
        plugins={[basicSettingPlugin, emojiPlugin, blockBreakoutPlugin]}
        ref={editorRef}
        {...props}
      />
      <EmojiSuggestions />
      <EmojiSelect />
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
