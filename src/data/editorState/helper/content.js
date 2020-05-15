import { convertFromRaw, EditorState } from "draft-js";

const rawContent = {
  blocks: [
    {
      key: "first",
      text: "",
      type: "title",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "second",
      text: "",
      type: "subTitle",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "third",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ],
  entityMap: {}
};
const content = convertFromRaw(rawContent);
const editorState = EditorState.createWithContent(content);
const selection = editorState.getSelection();
const newSelection = selection.merge({
  focusKey: "first",
  focusOffset: 0,
  hasFocus: true
});
export const forcedSelectionEditorState = EditorState.forceSelection(
  editorState,
  newSelection
);
