import { Modifier, EditorState } from "draft-js";
import _ from "lodash";

export const clearInlineStyles = editorState => {
  const styles = ["BOLD", "ITALIC", "UNDERLINE", "STRIKETHROUGH", "CODE"];

  const contentWithoutStyles = _.reduce(
    styles,
    (newContentState, style) =>
      Modifier.removeInlineStyle(
        newContentState,
        editorState.getSelection(),
        style
      ),
    editorState.getCurrentContent()
  );

  return EditorState.push(
    editorState,
    contentWithoutStyles,
    "change-inline-style"
  );
};
