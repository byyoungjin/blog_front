import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { EditorState } from "draft-js";

import { actions, selectors } from "data";

import PulseLoading from "components/Placeholder/PulseLoading";
import Dash from "components/MyEditor/Blocks/Dash";
import YouTube from "components/MyEditor/Blocks/YouTube";
import SplashSearch from "components/MyEditor/Blocks/SplashSearch";
import SplashImage from "components/MyEditor/Blocks/SplashImage";
import YouTubeVideo from "components/MyEditor/Blocks/YouTubeVideo";

import { useSetPostData } from "./hooks";

export default function Media({ contentState, block }) {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
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
      if (src) {
        media = <YouTubeVideo src={src} />;
      } else {
        media = <YouTube />;
      }

      break;
    case "unsplash":
      if (src) {
        setTitlePhoto(src.regularImageSrc);
        media = <SplashImage splashInfo={src} />;
      } else {
        media = <SplashSearch />;
      }
      break;
    case "placeholder":
      media = <PulseLoading />;
      break;
    default:
      return;
  }

  return media;
}

const Image = styled.img`
  width: 100%;
`;
