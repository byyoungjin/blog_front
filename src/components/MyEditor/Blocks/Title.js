import React, { useState } from "react";
import styled from "styled-components";

import { Row } from "components/Layout";

export default function Title({ children }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Container>
      <TitleContent
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </TitleContent>
      {isHovering && <TitleMarker>제목</TitleMarker>}
    </Container>
  );
}

const Container = styled(Row.Center)`
  color: black;
  width: 100%;
  height: 50px;
  position: relative;
`;

const TitleContent = styled.div`
  font-size: 40px;

  font-family: "Noto Serif KR", serif;
  font-weight: 800;
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
