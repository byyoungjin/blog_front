import React from "react";
import styled from "styled-components";

import Loading from "components/Placeholder/Loading";
import Dash from "components/MyEditor/Blocks/Dash";
import YouTube from "components/MyEditor/Blocks/YouTube";
import SplashSearch from "components/MyEditor/Blocks/SplashSearch";
import SplashImage from "components/MyEditor/Blocks/SplashImage";
import YouTubeVideo from "components/MyEditor/Blocks/YouTubeVideo";

import { useSetPostData } from "./hooks";

export default function Media({ contentState, block }) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const { src, data } = entity.getData();
  const type = entity.getType();
  const { setTitlePhoto, setTitle, setSubTitle } = useSetPostData();

  let media;
  switch (type) {
    case "image":
      media = <Image src={src} alt="inserted Image" />;
      setTitlePhoto(src);
      break;
    case "dash":
      media = <Dash />;
      break;
    case "youtube":
      media = <YouTubeVideo src={src} />;
      break;
    case "unsplash":
      media = <SplashImage splashInfo={src} />;
      src && setTitlePhoto(src.regularImageSrc);
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
