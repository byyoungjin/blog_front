import React, { useState } from "react";
import styled from "styled-components";

import { Row } from "components/Layout";

export default function SubTitle({ children }) {
  const [isHovering, setIsHovering] = useState(false);
  return (
    <Container>
      <SubTitleContent
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {children}
      </SubTitleContent>
      {isHovering && <SubTitleMarker>부제목</SubTitleMarker>}
    </Container>
  );
}

const Container = styled(Row.Center)`
  color: black;
  width: 100%;
  height: 50px;
  position: relative;
`;

const SubTitleContent = styled.div`
  font-size: 24px;
  font-family: "Noto Serif KR", serif;
  font-weight: 800;
  color: gray;
`;

const SubTitleMarker = styled.div`
  position: absolute;
  bottom: 15px;
  left: -80px;
  font-size: 16px;
  color:${({ theme }) => theme.colors.gray_light}
  padding-right: 5px;
  width: 50px;
  border-right: 3px solid ${({ theme }) => theme.colors.gray_light};
`;
