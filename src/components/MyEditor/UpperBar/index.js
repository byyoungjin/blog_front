import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

import { colors } from "theme";

const bold = "icons/editor/inline/bold.svg";
const italic = "icons/editor/inline/italic.svg";
const link = "icons/editor/inline/link.svg";
const quote = "icons/editor/inline/quote.svg";
const subTitle = "icons/editor/inline/subTitle.svg";
const title = "icons/editor/inline/title.svg";

export default function UpperBarComp({ editorState }) {
  const [upperBarPosition, setUpperBarPosition] = useState({
    transform: "scale(0"
  });
  useEffect(() => {
    const selection = editorState.getSelection();
    // const isSelection =
    //   selection &&
    //   (selection.getFocusOffset() !== selection.getAnchorOffset() ||
    //     selection.getAnchorKey() !== selection.getFocusKey());

    const currentContent = editorState.getCurrentContent();
    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    const node = document.querySelectorAll(
      `span[data-offset-key="${offsetKey}"]`
    )[0];

    if (!selection.isCollapsed()) {
      setUpperBarPosition({
        transform: "scale(1)",
        top: node.offsetTop - 60,
        left: node.offsetWidth / 2,
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)"
      });
    } else {
      setUpperBarPosition({
        transform: "scale(0)",
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        top: node.offsetTop - 60,
        left: node.offsetWidth / 2
      });
    }
  }, [editorState]);

  return (
    <UpperBar style={upperBarPosition}>
      <Button>
        <img src={bold} alt="bold" />
      </Button>
      <Button>
        <img src={italic} alt="italic" />
      </Button>
      <Button>
        <img src={link} alt="link" />
      </Button>
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
`;
