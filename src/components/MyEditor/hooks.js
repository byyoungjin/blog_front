import { useEffect, useCallback, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getVisibleSelectionRect } from "draft-js";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

import { actions, selectors } from "data";

//upper bar position 을 선택한 라인에 맞춰서 표시해준다.
export const useUppperBarPosition = () => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const upperBarPosition = useSelector(
    selectors.editorState.getUppperBarPosition
  );
  const setUpperBarPosition = useCallback(position => {
    dispatch(actions.editorState.updateUpperBarPosition(position));
  }, []);

  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  useEffect(() => {
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    const node = document.querySelectorAll(
      `[data-offset-key="${offsetKey}"]`
    )[0];
    const selectionRect = getVisibleSelectionRect(window);

    // const rootEditorNode = document.querySelectorAll(".DraftEditor-root")[0];
    // const rootEditorNodeRect = rootEditorNode.getBoundingClientRect();

    if (!selection.isCollapsed()) {
      setUpperBarPosition({
        transform: "scale(1)",
        top: node ? node.offsetTop - 60 : 0,
        left:
          selectionRect && selectionRect.left + selectionRect.width / 2 - 150,
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)"
      });
    } else {
      setUpperBarPosition({
        transform: "scale(0)",
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        top: node ? node.offsetTop - 60 : 0,

        left:
          selectionRect && selectionRect.left + selectionRect.width / 2 - 150
      });
    }
  }, [currentContent, selection, setUpperBarPosition]);

  return upperBarPosition;
};

export const useSidebarPosition = () => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const sidbarPosition = useSelector(selectors.editorState.getSideBarPosition);
  const editorType = useSelector(selectors.editorState.getEditorType);
  const readOnly = useSelector(selectors.editorState.getEditorReadOnly);
  const setSidebarPosition = useCallback(
    position => dispatch(actions.editorState.updateSideBarPosition(position)),
    []
  );
  const currentContent = editorState.getCurrentContent();
  const selection = editorState.getSelection();

  useEffect(() => {
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    const node = document.querySelectorAll(
      `[data-offset-key="${offsetKey}"]`
    )[0];
    const rootEditorNode = document.querySelectorAll(".DraftEditor-root")[0];
    const rootEditorNodeRect = rootEditorNode.getBoundingClientRect();
    const isEmpty = currentBlock.getText() === "";
    if (!isEmpty || editorType === "detail" || readOnly || !node) {
      setSidebarPosition({
        transform: "scale(0)",
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        top: node ? node.offsetTop - 10 : 0,

        left: rootEditorNodeRect.left - 50
      });
    } else {
      setSidebarPosition({
        transform: "scale(1)",
        top: node ? node.offsetTop - 10 : 0,
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        left: rootEditorNodeRect.left - 50
      });
    }
  }, [currentContent, selection, setSidebarPosition, editorType, readOnly]);

  return sidbarPosition;
};

export const useSideBarIsOpen = bool => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.editorState.getSideBarIsOpen);
  const toggleSidbarIsOpen = data =>
    dispatch(actions.editorState.updateSideBarIsOpen(bool ? bool : !isOpen));
  return [isOpen, toggleSidbarIsOpen];
};

export const useFocus = () => {
  const container = useRef(null);
  useEffect(() => {
    container.current.focus();
  }, []);

  return container;
};
