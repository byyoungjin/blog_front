import { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorState, getVisibleSelectionRect } from "draft-js";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

import { populateEditorState } from "./helper";
import { actions, selectors } from "data";

export function useEditorState(id) {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const setEditorState = useCallback(
    newEditorState =>
      dispatch(actions.editorState.updateEditorState({ newEditorState })),
    []
  );
  useEffect(() => {
    if (id) {
      populateEditorState({ id, setEditorState });
    }
  }, [id, setEditorState]);

  return [editorState, setEditorState];
}

//upper bar position 을 선택한 라인에 맞춰서 표시해준다.
export const useUppperBarPosition = ({ editorRef }) => {
  const dispatch = useDispatch();
  const upperBarPosition = useSelector(
    selectors.editorState.getUppperBarPosition
  );
  const setUpperBarPosition = useCallback(position => {
    dispatch(actions.editorState.updateUpperBarPostion(position));
  }, []);
  const editorState = useSelector(selectors.editorState.getEditorState);

  useEffect(() => {
    const selection = editorState.getSelection();

    // const rootEditorNode = document.querySelectorAll(".DraftEditor-root")[0];
    // const rootEditorNodeRect = rootEditorNode.getBoundingClientRect();

    const selectionRect = getVisibleSelectionRect(window);

    if (!selection.isCollapsed()) {
      setUpperBarPosition({
        transform: "scale(1)",
        top: selectionRect && selectionRect.top - 60,
        left:
          selectionRect && selectionRect.left + selectionRect.width / 2 - 150,
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)"
      });
    } else {
      setUpperBarPosition({
        transform: "scale(0)",
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        top: selectionRect && selectionRect.top - 60,
        left:
          selectionRect && selectionRect.left + selectionRect.width / 2 - 150
      });
    }
  }, [editorState, editorRef, setUpperBarPosition]);

  return upperBarPosition;
};

export const useSidebarPosition = () => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const sidbarPosition = useSelector(selectors.editorState.getSideBarPosition);
  const setSidebarPosition = useCallback(
    position => dispatch(actions.editorState.updateSideBarPosition(position)),
    [dispatch]
  );

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    const node = document.querySelectorAll(
      `[data-offset-key="${offsetKey}"]`
    )[0];

    const rootEditorNode = document.querySelectorAll(".DraftEditor-root")[0];
    const rootEditorNodeRect = rootEditorNode.getBoundingClientRect();

    const isEmpty = currentBlock.getText() === "";

    if (!isEmpty) {
      setSidebarPosition({
        transform: "scale(0)",
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        top: node.offsetTop - 10,
        left: rootEditorNodeRect.left - 50
      });
    } else {
      setSidebarPosition({
        transform: "scale(1)",
        top: node.offsetTop - 10,
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        left: rootEditorNodeRect.left - 50
      });
    }
  }, [editorState, setSidebarPosition]);

  return sidbarPosition;
};

export const useSideBarIsOpen = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.editorState.getSideBarIsOpen);
  const toggleSidbarIsOpen = data =>
    dispatch(actions.editorState.updateSideBarIsOpen(!isOpen));
  return [isOpen, toggleSidbarIsOpen];
};
