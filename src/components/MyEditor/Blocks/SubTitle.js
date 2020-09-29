import React, { useState } from "react";
import styled from "styled-components";

import { Row } from "components/Layout";

export default function SubTitle({ children }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <SubTitleContent
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {isHovering && <SubTitleMarker>부제목</SubTitleMarker>}
    </SubTitleContent>
  );
}

const SubTitleContent = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  font-size: 24px;
  font-family: "Noto Serif KR", serif;
  font-weight: 800;
  color: gray;
`;

const SubTitleMarker = styled.div`
  position: absolute;
  bottom: 23px;
  left: -80px;
  font-size: 16px;
  color:${({ theme }) => theme.colors.gray_light}
  padding-right: 5px;
  width: 50px;
  border-right: 3px solid ${({ theme }) => theme.colors.gray_light};
`;
