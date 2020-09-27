import React from "react";
import styled from "styled-components";

const YouTubeVideo = ({ src }) => {
  const isWatch = src.includes("watch");
  const splitLetter = isWatch ? "=" : "/";
  const newSrc =
    "https://www.youtube.com/embed/" + src.split(splitLetter).reverse()[0];
  return (
    <YoutubeContainer>
      <YoutubeIfram
        title="title"
        src={newSrc}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></YoutubeIfram>
    </YoutubeContainer>
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
  letf: 0;
  width: 100%;
  height: 100%;
`;
