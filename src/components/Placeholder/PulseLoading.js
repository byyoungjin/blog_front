import React from "react";
import { PulseLoader } from "halogenium";
import styled from "styled-components";

export default function PulseLoading() {
  return (
    <Container>
      <PulseLoader color="#F1AE03" size="16px" margin="4px" />
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
