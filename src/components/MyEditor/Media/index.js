import React from "react";
import styled from "styled-components";

import Loading from "components/Placeholder/Loading";
import Dash from "components/MyEditor/Blocks/Dash";
import YouTube from "components/MyEditor/Blocks/YouTube";
import SplashSearch from "components/MyEditor/Blocks/SplashSearch";
import SplashImage from "components/MyEditor/Blocks/SplashImage";

export default function Media({ contentState, block }) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, splashInfo } = entity.getData();
  const type = entity.getType();
  let media;
  switch (type) {
    case "image":
      media = <Image src={src} alt="inserted Image" />;
      break;
    case "placeholder":
      media = <Loading />;
      break;
    case "dash":
      media = <Dash />;
      break;
    case "youtube":
      media = <YouTube />;
      break;
    case "unsplash":
      media = splashInfo ? (
        <SplashImage splashInfo={splashInfo} />
      ) : (
        <SplashSearch />
      );
      break;
    default:
      return;
  }

  return media;
}

const Image = styled.img`
  width: 100%;
`;
