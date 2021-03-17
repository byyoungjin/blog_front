import React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";

import { useMeasure } from "hooks";
import { theme } from "theme";

export default function WithSelectable({
  WrappedComponent,
  isSelected,
  onSelect
}) {
  const [bind, bounds] = useMeasure();
  const { width, top, height } = bounds;
  const props = useSpring({
    top: isSelected ? height / 2 : -10,
    opacity: isSelected ? 0.5 : 0
  });

  return (
    <Container {...bind} onClick={onSelect}>
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
  left: -20%;
  width: 140%;
  height: 100%;
  background: ${theme["color-primary-500"]};
  opacity: 0.5;
`;
