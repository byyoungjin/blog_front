import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EditorState, getVisibleSelectionRect, convertFromRaw } from "draft-js";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

import { actions, selectors } from "data";
import { loadContentFromStorage } from "./helper";
import { useModal } from "components/Modal/hooks";

export function useEditorState(id) {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);

  const setEditorState = useCallback(({ newEditorState, from }) => {
    dispatch(actions.editorState.updateEditorState({ newEditorState, from }));
  }, []);

  // log(editorState);
  useEffect(() => {
    dispatch(
      actions.editorState.updateEditorState({
        newEditorState: editorState,
        from: "useEditorState"
      })
    );
  }, [editorState]);

  usePopulateEditorState({ id, setEditorState, editorState });

  return [editorState, setEditorState];
}

export const usePopulateEditorState = ({ id, setEditorState, editorState }) => {
  const { modal, setUpModal, setDownModal } = useModal();
  const readOnly = useSelector(selectors.editorState.getIsReadOnly);

  const yesHandler = rawEditorState => {
    const contentState = convertFromRaw(rawEditorState);
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentState
    });
    const focusedEditorState = EditorState.moveFocusToEnd(newEditorState);

    setEditorState({
      newEditorState: focusedEditorState,
      from: "populateEditorState"
    });
    setDownModal();
  };

  const noHandler = () => {
    setDownModal();
  };

  useEffect(() => {
    if (id && !readOnly) {
      console.log("readOnly", readOnly);
      const rawEditorState = loadContentFromStorage(id);
      if (rawEditorState !== null) {
        setUpModal(
          <>
            <div>이전에 작성하던글을 이어서 작성하시겠습니까?</div>
            <button onClick={yesHandler.bind(this, rawEditorState)}>네</button>
            <button onClick={noHandler}>아니오</button>
          </>
        );
      }
    }
  }, []);
};

//upper bar position 을 선택한 라인에 맞춰서 표시해준다.
export const useUppperBarPosition = ({ editorRef }) => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const upperBarPosition = useSelector(
    selectors.editorState.getUppperBarPosition
  );
  const setUpperBarPosition = useCallback(position => {
    dispatch(actions.editorState.updateUpperBarPosition(position));
  }, []);

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    const node = document.querySelectorAll(
      `[data-offset-key="${offsetKey}"]`
    )[0];

    // const rootEditorNode = document.querySelectorAll(".DraftEditor-root")[0];
    // const rootEditorNodeRect = rootEditorNode.getBoundingClientRect();

    const selectionRect = getVisibleSelectionRect(window);

    if (!selection.isCollapsed()) {
      setUpperBarPosition({
        transform: "scale(1)",
        top: node.offsetTop - 60,
        left:
          selectionRect && selectionRect.left + selectionRect.width / 2 - 150,
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)"
      });
    } else {
      setUpperBarPosition({
        transform: "scale(0)",
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        top: node.offsetTop - 60,
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
  const readOnly = useSelector(selectors.editorState.getIsReadOnly);
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

    if (!isEmpty || readOnly) {
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

export const useSideBarIsOpen = bool => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.editorState.getSideBarIsOpen);
  const toggleSidbarIsOpen = data =>
    dispatch(actions.editorState.updateSideBarIsOpen(bool ? bool : !isOpen));
  return [isOpen, toggleSidbarIsOpen];
};

export const usePublishContent = ({ editorState, UserId }) => {
  const dispatch = useDispatch();

  const publish = () => {
    dispatch(actions.post.createPost({ editorState, UserId }));
  };
  return publish;
};
