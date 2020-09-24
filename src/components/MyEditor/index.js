import React, { useRef, useCallback, useEffect } from "react";
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
import { decorators } from "./decorators";

import { saveContent } from "./helper";

export default function BasicEditor() {
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

  const { EmojiSuggestions } = emojiPlugin;
  const basicSettingPlugin = createBasicSettingsPlugin({
    saveHandler: saveHandler.bind(this, editorState, userId),
    setEditorState,
    onLoadHandler
  });

  return (
    <EditorWrapper onClick={focusOnEditor}>
      <button onMouseDown={logCurrentBlock}>log</button>
      {editorType === "detail" && <EditorDetailHeader />}
      <PlugInsEditor
        editorState={editorState}
        onChange={newEditorState =>
          setEditorState({ newEditorState, from: "EditorOnChange" })
        }
        plugins={[basicSettingPlugin, emojiPlugin, blockBreakoutPlugin]}
        decorators={decorators}
        ref={editorRef}
        readOnly={readOnly ? readOnly : false}
      />
      {
        <>
          <EmojiSuggestions />
          <SideBar />
          <UpperBar editorRef={editorRef} />
        </>
      }
    </EditorWrapper>
  );
}

const EditorWrapper = styled.div`
  width: 90%;
  padding: 20px;
  grid-area: editor;
  font-size: 21px;
  font-family: "Nanum Gothic", san-serif;
  font-weight: 400;
  color: ${colors.black_84};

  ${winSize.onLarge("width:60%")}
`;
