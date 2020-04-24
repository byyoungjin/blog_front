import React from "react";
import styled from "styled-components";

import Loading from "components/Placeholder/Loading";

export default function Media({ contentState, block }) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();
  let media;
  switch (type) {
    case "image":
      media = <Image src={src} alt="inserted Image" />;
      break;
    case "placeholder":
      media = <Loading />;
      break;
    default:
      return;
  }

  return media;
}

const Image = styled.img`
  width: 100%;
`;
