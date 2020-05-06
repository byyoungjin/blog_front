import React from "react";
import styled from "styled-components";

import Loading from "components/Placeholder/Loading";
import Dash from "components/MyEditor/Blocks/Dash";
import YouTube from "components/MyEditor/Blocks/YouTube";
import SplashSearch from "components/MyEditor/Blocks/SplashSearch";
import SplashImage from "components/MyEditor/Blocks/SplashImage";
import YouTubeVideo from "components/MyEditor/Blocks/YouTubeVideo";
import PostTitleInput from "components/MyEditor/Blocks/PostTitleInput";
import PostSubTitleInput from "components/MyEditor/Blocks/PostSubTitleInput";
import PostTitle from "components/MyEditor/Blocks/PostTitle";
import PostSubTitle from "components/MyEditor/Blocks/PostSubTitle";

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
    case "placeholder":
      media = <Loading />;
      break;
    case "dash":
      media = <Dash />;
      break;
    case "youtube":
      media = data ? <YouTubeVideo src={data} /> : <YouTube />;
      break;
    case "unsplash":
      media = data ? <SplashImage splashInfo={data} /> : <SplashSearch />;
      data && setTitlePhoto(data.regularImageSrc);
      break;
    case "postTitle":
      media = data ? <PostTitle data={data} /> : <PostTitleInput />;
      break;
    case "postSubTitle":
      media = data ? <PostSubTitle data={data} /> : <PostSubTitleInput />;
      break;
    default:
      return;
  }

  return media;
}

const Image = styled.img`
  width: 100%;
`;
