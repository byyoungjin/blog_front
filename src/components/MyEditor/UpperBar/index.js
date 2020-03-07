import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";
import { getVisibleSelectionRect } from "draft-js";

import { colors } from "theme";
import { useRect } from "utils/Dom";

const bold = "icons/editor/inline/bold.svg";
const italic = "icons/editor/inline/italic.svg";
const link = "icons/editor/inline/link.svg";
const quote = "icons/editor/inline/quote.svg";
const subTitle = "icons/editor/inline/subTitle.svg";
const title = "icons/editor/inline/title.svg";

export default function UpperBarComp({ editorState, editorRef }) {
  const [upperBarPosition, setUpperBarPosition] = useState({
    transform: "scale(0)"
  });

  useEffect(() => {
    const selection = editorState.getSelection();

    const rootEditorNode = document.querySelectorAll(".DraftEditor-root")[0];
    const rootEditorNodeRect = rootEditorNode.getBoundingClientRect();
    console.log("rootEditorNodeRect", rootEditorNodeRect);

    const selectionRect = getVisibleSelectionRect(window);
    console.log("selectionRect", selectionRect);

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
  }, [editorState, editorRef]);

  return (
    <UpperBar style={upperBarPosition}>
      {/* <button onMouseClick={() => editorRef.current.focus()}>focus</button> */}
      <Button>
        <img src={bold} alt="bold" />
      </Button>
      <Button>
        <img src={italic} alt="italic" />
      </Button>
      <Button>
        <img src={link} alt="link" />
      </Button>
      <Seperator />
      <Button>
        <img src={title} alt="title" />
      </Button>
      <Button>
        <img src={subTitle} alt="subTitle" />
      </Button>
      <Button>
        <img src={quote} alt="quote" />
      </Button>
    </UpperBar>
  );
}

const Seperator = styled.div`
  display: inline-block;
  border-right: 1px solid #ddd;
  height: 24px;
  margin: 0 0.5em;
`;

const UpperBar = styled.div`
  width: 300px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.black_84};
  border-radius: 20px;
  position: absolute;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: ${colors.black_84};
    border-width: 4px;
    margin-left: -4px;
  }
`;
