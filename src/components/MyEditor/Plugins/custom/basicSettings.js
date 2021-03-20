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
import Subject from "components/MyEditor/Blocks/Subject";

import { readFile } from "components/MyEditor/helper";
import { decorators } from "components/MyEditor/decorators";

const customBlockRenderMap = Immutable.Map({
  // "code-block": {
  //   element: "code",
  //   wrapper: "pre"
  // },
  title: {
    element: Title
  },
  subTitle: {
    element: SubTitle
  },
  quoteBlock: {
    element: QuoteBlock
  },
  subject: {
    element: Subject
  },
  unstyled: {
    element: Paragraph
  }
});

const { hasCommandModifier } = KeyBindingUtil;

export default ({ saveHandler, onLoadHandler, setEditorState }) => ({
  // Decorators
  decorators,

  //Key Bindings
  keyBindingFn: e => {
    //Cmd + s
    if (e.keyCode === 83 && hasCommandModifier(e)) {
      return "myeditor-save";
    }
    //shift + enter
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

  //Custom Block Rendering
  blockRenderMap: DefaultDraftBlockRenderMap.merge(customBlockRenderMap),

  //Custom Block Components
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

  blockStyleFn: block => {
    switch (block.getType()) {
      case "code-block":
        return "language-javascript";
      default:
        return null;
    }
  }
});
