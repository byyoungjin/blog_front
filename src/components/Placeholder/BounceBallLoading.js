import React from "react";
import styled, { keyframes } from "styled-components";

import { Row } from "components/Layout";

export default function BounceBallLoading() {
  return (
    <Row.EndCenter>
      <BounceBall />
      <Text>NOW LOADING</Text>
    </Row.EndCenter>
  );
}

const bounce = keyframes`
0% {
  top: 30px;
  height: 5px;
  border-radius: 60px 60px 20px 20px;
  transform: scaleX(2);
}
35% {
  height: 15px;
  border-radius: 50%;
  transform: scaleX(1);
}
100% {
  top: 0;
}
`;

const Text = styled.div`
  margin-left: 15px;
  color: ${({ theme }) => theme.colors.yellow};
`;

const BounceBall = styled.div`
  position: relative;
  display: inline-block;
  height: 37px;
  width: 15px;
  &:before {
    position: absolute;
    content: "";
    display: block;
    top: 0;
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.yellow};
    transform-origin: 50%;
    animation: ${bounce} 500ms alternate infinite ease;
  }
`;
