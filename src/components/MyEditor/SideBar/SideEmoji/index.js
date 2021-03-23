import React from "react";
import styled, { css } from "styled-components";

import { emojiPlugin } from "../../Plugins/emoji";

const { EmojiSelect } = emojiPlugin;

export default function EmojiSideButton({ position }) {
  const newPosition = {
    ...position,
    left: position.left ? position.left - 80 : 0,
    transform: "scale(1)"
  };
  return (
    <Container position={position}>
      <EmojiSelect />
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  ${({ position }) =>
    css`
      ${{ ...position }}
    `}
  ${({ position }) => `
  
    left: ${position.left ? position.left - 80 : 0},
    transform: "scale(1)" 
  `}
`;
