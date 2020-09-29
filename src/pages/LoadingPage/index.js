import React from "react";
import styled, { keyframes } from "styled-components";

import { Row } from "components/Layout";

import BounceBallLoading from "components/Placeholder/BounceBallLoading";
import PulseLoading from "components/Placeholder/PulseLoading";

export default function LoadingPage() {
  return (
    <Container>
      <PulseLoading />
    </Container>
  );
}

const Container = styled(Row.CenterCenter)`
  flex: 1;
`;
