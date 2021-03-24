import React, { useState } from "react";
import styled from "styled-components";

import { Row } from "components/Layout";
import { theme } from "theme";

export default function Title({ children }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <TitleContent
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {children}
      {isHovering && <TitleMarker>제목</TitleMarker>}
    </TitleContent>
  );
}

const TitleContent = styled.div`
  font-size: 32px;
  color: ${theme["color-basic-900"]};
  font-family: "Noto Serif KR", serif;
  font-weight: 800;
  width: 100%;
  position: relative;
  margin: 20px 0 10px;

  @media (min-width: 600px) {
    font-size: 32px;
  }
`;

const TitleMarker = styled.div`
  position: absolute;
  bottom: 15px;
  left: -80px;
  font-size: 16px;
  color:${({ theme }) => theme.colors.gray_light}
  padding-right: 5px;
  width: 50px;
  border-right: 3px solid ${({ theme }) => theme.colors.gray_light};
`;
