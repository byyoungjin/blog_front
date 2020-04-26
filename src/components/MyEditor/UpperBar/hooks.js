import { useDispatch, useSelector } from "react-redux";
import { RichUtils, EditorState } from "draft-js";

import { actions, selectors } from "data";

export const useToggleStyleHandler = () => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);

  const toggleInlineStyle = inlineStyle =>
    dispatch(actions.editorState.toggleInline({ editorState, inlineStyle }));

  const toggleBlocktype = blockType => {
    const newEditorState = RichUtils.toggleBlockType(editorState, blockType);
    dispatch(
      actions.editorState.updateEditorState({
        newEditorState,
        from: "toggleBlockType"
      })
    );
  };

  const toggleLinkStyle = url => {
    dispatch(actions.editorState.toggleLink({ editorState, url }));
  };

  const inputLinkHandler = () => {
    dispatch(actions.editorState.toggleIsLinkInput(true));
  };

  return [
    toggleInlineStyle,
    toggleBlocktype,
    toggleLinkStyle,
    inputLinkHandler
  ];
};
