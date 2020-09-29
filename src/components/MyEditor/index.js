import React, { useRef, useCallback, useEffect, forwardRef } from "react";
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

const BasicEditor = forwardRef((props, ref) => {
  const dispatch = useDispatch();

  const userId = useSelector(selectors.user.getUserId);
  const readOnly = useSelector(selectors.editorState.getEditorReadOnly);
  const editorType = useSelector(selectors.editorState.getEditorType);
  const editorState = useSelector(selectors.editorState.getEditorState);

  const setEditorState = useCallback(({ newEditorState, from }) => {
    dispatch(actions.editorState.updateEditorState({ newEditorState, from }));
  }, []);

  const saveHandler = (editorState, userId) => {
    saveContent({ editorState, id: userId });
    dispatch(actions.modal.modalUpAndGo("saved!"));
  };

  const onLoadHandler = selectedFile =>
    dispatch(actions.editorState.addImage({ selectedFile, userId }));

  const logCurrentBlock = () => {
    log("", editorState);
  };

  const { EmojiSuggestions } = emojiPlugin;
  const basicSettingPlugin = createBasicSettingsPlugin({
    saveHandler: saveHandler.bind(this, editorState, userId),
    onLoadHandler,
    setEditorState
  });

  return (
    <EditorWrapper>
      {/* <button onMouseDown={logCurrentBlock}>log</button> */}
      {editorType === "detail" && <EditorDetailHeader />}
      <PlugInsEditor
        editorState={editorState}
        onChange={newEditorState =>
          setEditorState({ newEditorState, from: "EditorOnChange" })
        }
        plugins={[emojiPlugin, blockBreakoutPlugin, basicSettingPlugin]}
        readOnly={readOnly ? readOnly : false}
        ref={ref}
      />

      <EmojiSuggestions />
      <SideBar />
      <UpperBar />
    </EditorWrapper>
  );
});

export default BasicEditor;

const EditorWrapper = styled.div`
  width: 90%;
  min-height: 100vh;
  padding: 20px;
  grid-area: editor;
  font-size: 21px;
  font-family: "Nanum Gothic", san-serif;
  font-weight: 400;
  color: ${colors.black_84};
  ${winSize.onLarge("width:60%")};
`;
