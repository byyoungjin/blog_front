import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { theme } from "theme";

export default function WithSelectable({
  WrappedComponent,
  isSelected,
  onSelect
}) {
  const props = useSpring({
    top: isSelected ? 8 : -10,
    opacity: isSelected ? 0.5 : 0
  });

  return (
    <Container onClick={onSelect}>
      <AnimatedFill style={props}></AnimatedFill>
      <WrappedComponent />
    </Container>
  );
}

const Container = styled.div`
  cursor: pointer;
  position: relative;
`;

const AnimatedFill = styled(animated.div)`
  position: absolute;
  top: 0;
  left: -15px;
  ${`width: calc(100% + 30px)`};
  height: 100%;
  background: ${theme["color-primary-500"]};
  opacity: 0.5;
`;
