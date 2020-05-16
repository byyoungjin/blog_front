import React from "react";

import {
  RichUtils,
  getDefaultKeyBinding,
  KeyBindingUtil,
  convertToRaw,
  DefaultDraftBlockRenderMap
} from "draft-js";
import Immutable from "immutable";
import log from "utils/log";

import Media from "components/MyEditor/Media";
import Code from "components/MyEditor/Blocks/Code";
import Title from "components/MyEditor/Blocks/Title";
import SubTitle from "components/MyEditor/Blocks/SubTitle";
import QuoteBlock from "components/MyEditor/Blocks/QuoteBlock";
import Paragraph from "components/MyEditor/Blocks/Paragraph";
import YouTube from "components/MyEditor/Blocks/YouTube";
import SplashSearch from "components/MyEditor/Blocks/SplashSearch";

import { readFile } from "components/MyEditor/helper";
import { decorators } from "components/MyEditor/decorators";
import { clearInlineStyles } from "../helper/index";

const customBlockRenderMap = Immutable.Map({
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

const { hasCommandModifier } = KeyBindingUtil;

export default ({ saveHandler, setEditorState, onLoadHandler }) => ({
  keyBindingFn: e => {
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    if (e.keyCode === 13 && e.shiftKey) {
      return "soft-new-line-add";
    }
    return getDefaultKeyBinding(e);
  },

  handleKeyCommand: (command, editorState) => {
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
  },

  blockRendererFn: block => {
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
  },

  blockRenderMap: DefaultDraftBlockRenderMap.merge(customBlockRenderMap),

  handlePastedFiles: files => {
    readFile({ files, onLoadHandler });
  },
  handleReturn: (e, editorState) => {
    // const clearedEditorState = clearInlineStyles(editorState);
    // log(editorState);
    // log(clearedEditorState);
    // setEditorState({
    //   newEditorState: clearedEditorState,
    //   from: "handle Return"
    // });
  },
  decorators
});
