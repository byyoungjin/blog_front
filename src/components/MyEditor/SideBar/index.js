import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

import BlockButtons from "./BlockButtons";
const plus = "icons/editor/block/plus.svg";

export default function SideBarComp({ editorState, children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [sidebarPosition, setSidebarPosition] = useState({
    transform: "scale(0)"
  });
  const toggleSidebar = () => setIsOpen(prev => !prev);

  useEffect(() => {
    const currentContent = editorState.getCurrentContent();
    const selection = editorState.getSelection();

    const currentBlock = currentContent.getBlockForKey(selection.getStartKey());
    const offsetKey = DraftOffsetKey.encode(currentBlock.getKey(), 0, 0);
    const node = document.querySelectorAll(
      `[data-offset-key="${offsetKey}"]`
    )[0];

    const isEmpty = currentBlock.getText() === "";

    if (!isEmpty) {
      setSidebarPosition({
        transform: "scale(0)",
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)",
        top: node.offsetTop - 10
      });
    } else {
      setSidebarPosition({
        transform: "scale(1)",
        top: node.offsetTop - 10,
        transition: "transform 0.15s cubic-bezier(.3,1.2,.2,1)"
      });
    }
  }, [editorState, isOpen]);

  return (
    <SideBarContainer style={sidebarPosition}>
      <SideBar onMouseDown={toggleSidebar}>
        <img src={plus} alt="plus" />
      </SideBar>
      {isOpen && <BlockButtons />}
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  display: flex;
  position: absolute;
  left: -50px;
`;

const SideBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid black;
  cursor: pointer;
`;
