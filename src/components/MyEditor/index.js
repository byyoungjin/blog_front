import React, { useState, useRef } from "react";
import { EditorState } from "draft-js";

import BasicEditor from "./BasicEditor";

export default function MyEditor() {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const editorRef = useRef(null);
  return (
    <BasicEditor
      editorState={editorState}
      setEditorState={setEditorState}
      editorRef={editorRef}
    />
  );
}
