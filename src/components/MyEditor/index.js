import React, { useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PlugInsEditor from "draft-js-plugins-editor";

import { actions, selectors } from "data";

import SideBar from "./SideBar";
import UpperBar from "./UpperBar";
import { colors } from "theme";
import winSize from "utils/winSize";
import log from "utils/log";

import { emojiPlugin } from "./Plugins/emoji";
import { blockBreakoutPlugin } from "./Plugins/blockBreakOut";
import createBasicSettingsPlugin from "./Plugins/custom/basicSettings";
import EditorDetailHeader from "./EditorDetailHeader";
import { saveContent } from "./helper";

export default function BasicEditor({
  readOnly: readOnlyForDetailView,
  ...props
}) {
  const dispatch = useDispatch();
  const editorRef = useRef();

  const userId = useSelector(selectors.user.getUserId);
  const readOnly = useSelector(selectors.editorState.getEditorReadOnly);
  const editorType = useSelector(selectors.editorState.getEditorType);
  const editorState = useSelector(selectors.editorState.getEditorState);

  const setEditorState = useCallback(({ newEditorState, from }) => {
    dispatch(actions.editorState.updateEditorState({ newEditorState, from }));
  }, []);

  const focusOnEditor = () => editorRef.current.focus();

  const saveHandler = (editorState, userId) => {
    saveContent({ editorState, id: userId });
    dispatch(actions.modal.modalUpAndGo("saved!"));
  };

  const onLoadHandler = selectedFile =>
    dispatch(
      actions.editorState.addImage({ selectedFile, editorState, userId })
    );

  const logCurrentBlock = () => {
    log(editorState);
  };

  const { EmojiSuggestions, EmojiSelect } = emojiPlugin;
  const basicSettingPlugin = createBasicSettingsPlugin({
    saveHandler: saveHandler.bind(this, editorState, userId),
    setEditorState,
    onLoadHandler
  });

  return (
    <EditorWrapper onClick={focusOnEditor}>
      {/* <button onMouseDown={logCurrentBlock}>log</button> */}
      {editorType === "detail" && <EditorDetailHeader />}
      <PlugInsEditor
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
  width: 90%;
  padding: 20px;
  grid-area: editor;
  font-size: 24px;
  color: ${colors.black_84};

  ${winSize.onLarge("width:60%")}
`;
