import { useEffect, useState } from "react";
import { EditorState } from "draft-js";

import { populateEditorState } from "./helper";

export default function useEditorState(id) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  useEffect(() => {
    populateEditorState({ setEditorState, id });
  }, []);

  return [editorState, setEditorState];
}
