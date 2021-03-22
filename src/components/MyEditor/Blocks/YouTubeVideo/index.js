import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { selectors } from "data";
import { Col } from "components/Layout";
import youtubeLogo from "./youtubeLogo.png";

const YouTubeVideo = ({ src }) => {
  const readOnly = useSelector(selectors.editorState.getIsReadOnly);
  const isWatch = src.includes("watch");
  const splitLetter = isWatch ? "=" : "/";
  const newSrc =
    "https://www.youtube.com/embed/" + src.split(splitLetter).reverse()[0];
  return readOnly ? (
    <YoutubeContainer>
      <YoutubeIfram
        title="title"
        src={newSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></YoutubeIfram>
    </YoutubeContainer>
  ) : (
    <YouTubePlaceHolderContainer>
      <YoutubePlaceHolder>
        <YoutubeImage src={youtubeLogo} alt="youtubeLogo" />
        <YoutubeSrc>{newSrc}</YoutubeSrc>
      </YoutubePlaceHolder>
    </YouTubePlaceHolderContainer>
  );
};

export default YouTubeVideo;

const YoutubeContainer = styled.div`
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
`;
const YoutubeIfram = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const YouTubePlaceHolderContainer = styled.div`
  width: 100%;
  position: relative;
  padding-bottom: 56.25%;
  padding-top: 30px;
  height: 0;
  overflow: hidden;
  border: 3px solid ${({ theme }) => theme.colors.gray_light};
  border-radius: 5px;
`;

const YoutubePlaceHolder = styled(Col.CenterCenter)`
  position: absolute;
  top: 0;
  letf: 0;
  width: 100%;
  height: 100%;
`;

const YoutubeSrc = styled.div`
  color: ${({ theme }) => theme.colors.gray_light};
`;

const YoutubeImage = styled.img`
  width: 100px;
`;
