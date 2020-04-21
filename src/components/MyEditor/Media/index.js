import React from "react";
import styled from "styled-components";

export default function Media({ contentState, block }) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();

  let media;
  if (type === "image") {
    media = <Image src={src} alt="inserted Image" />;
  }

  return media;
}

const Image = styled.img`
  width: 100%;
`;
