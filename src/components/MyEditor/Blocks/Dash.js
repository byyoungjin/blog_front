import React from "react";
import styled from "styled-components";

import { Row } from "components/Layout";
import winSize from "utils/winSize";

export default function DashComp() {
  return (
    <Container>
      <Dash />
      <LogText>log</LogText>
      <Dash />
    </Container>
  );
}

const Container = styled(Row.CenterCenter)`
  width: 100%;
`;

const LogText = styled.div`
  margin: 0 20px;
  color: ${({ theme }) => theme.colors.gray_light};
  font-family: "Pacifico", cursive;
`;

const Dash = styled.div`
  width: 30%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray_light};
`;
