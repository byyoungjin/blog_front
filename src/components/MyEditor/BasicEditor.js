import React, { useState, useEffect, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
  DefaultDraftBlockRenderMap
} from "draft-js";
import Editor from "draft-js-plugins-editor";
import createEmojiPlugin from "draft-js-emoji-plugin";
import "draft-js-emoji-plugin/lib/plugin.css";

import Immutable from "immutable";

import { actions, selectors } from "data";
import { readFile } from "./helper";
import SideBar from "./SideBar";
import UpperBar from "./UpperBar";
import { colors } from "theme";
import Media from "./Media";
import Code from "./Blocks/Code";

import Title from "./Blocks/Title";
import SubTitle from "./Blocks/SubTitle";
import QuoteBlock from "./Blocks/QuoteBlock";
import Paragraph from "./Blocks/Paragraph";
import YouTube from "./Blocks/YouTube";
import SplashSearch from "./Blocks/SplashSearch";
import { compositeDecorator } from "components/MyEditor/decorators";

import log from "utils/log";

const { hasCommandModifier } = KeyBindingUtil;
const emojiPlugin = createEmojiPlugin();
const { EmojiSuggestions, EmojiSelect } = emojiPlugin;

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
  const focusOnEditor = useCallback(() => editorRef.current.focus(), [
    editorRef
  ]);
  const contentState = editorState.getCurrentContent();

  // useEffect(() => {
  //   focusOnEditor();
  // }, [focusOnEditor]);

  const myKeybindingFn = e => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    if (e.keyCode === 13 && e.shiftKey) {
      return "soft-new-line-add";
    }
    return getDefaultKeyBinding(e);
  };

  const handleKeyCommand = (command, editorState) => {
    let newEditorState = RichUtils.handleKeyCommand(editorState, command);
    if (command === "myeditor-save") {
      saveHandler();
      return "handled";
    }
    if (command === "soft-new-line-add") {
      newEditorState = RichUtils.insertSoftNewline(editorState);
    }

    if (newEditorState) {
      setEditorState({ newEditorState, from: "handleKeyCommand" });
      return "handled";
    }
    return "not-handled";
  };

  const mediaBlockRenderer = block => {
    const type = block.getType();
    const entity = block.getEntityAt(0);

    switch (type) {
      case "atomic":
        return {
          component: Media,
          editable: entity ? false : true
        };
      default:
        return null;
    }
  };
  const blockRenderMap = Immutable.Map({
    "code-block": {
      element: "div",
      wrapper: <Code />
    },
    title: {
      element: Title
    },
    subTitle: {
      element: SubTitle
    },
    quoteBlock: {
      element: QuoteBlock
    },
    unsplashInput: {
      element: SplashSearch
    },
    youtubeInput: {
      element: YouTube
    },
    unstyled: {
      element: Paragraph
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
        onChange={newEditorState =>
          setEditorState({ newEditorState, from: "EditorOnChange" })
        }
        handleKeyCommand={handleKeyCommand}
        keyBindingFn={myKeybindingFn}
        ref={editorRef}
        blockRendererFn={mediaBlockRenderer}
        blockRenderMap={extendedBlockRenderMap}
        handlePastedFiles={handlePastedFilesFn}
        readOnly={readOnlyForDetailView ? readOnlyForDetailView : readOnly}
        plugins={[emojiPlugin]}
        decorators={[compositeDecorator]}
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
