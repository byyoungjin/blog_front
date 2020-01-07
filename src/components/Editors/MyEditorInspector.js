import React from "react";
import { convertToRaw } from "draft-js";

export default function MyEditorInspector({ editorState }) {
  const getContentAsRawJson = editorState => () => {
    const contentState = editorState.getCurrentContent();
    const raw = convertToRaw(contentState);
    return JSON.stringify(raw, null, 2);
  };
  return <pre>{getContentAsRawJson(editorState)()}</pre>;
}
