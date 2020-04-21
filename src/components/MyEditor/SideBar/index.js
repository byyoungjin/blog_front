import React, { useEffect, useState } from "react";
import styled from "styled-components";
import DraftOffsetKey from "draft-js/lib/DraftOffsetKey";

import BlockButtons from "./BlockButtons";
import { useSidebarPosition } from "../hooks";

const plus = "icons/editor/block/plus.svg";

export default function SideBarComp({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarPosition = useSidebarPosition();
  const toggleSidebar = () => setIsOpen(prev => !prev);

  return (
    <SideBarContainer style={sidebarPosition}>
      <SideBar onMouseDown={toggleSidebar}>
        <img src={plus} alt="plus" />
      </SideBar>
      <BlockButtons isOpen={isOpen} />
    </SideBarContainer>
  );
}

const SideBarContainer = styled.div`
  display: flex;
  position: absolute;
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
