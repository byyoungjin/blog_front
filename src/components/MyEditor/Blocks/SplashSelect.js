import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { actions } from "data";

export default function SplashSelect({ images }) {
  const dispatch = useDispatch();

  const imageSelectHandler = splashInfo => {
    dispatch(actions.editorState.selectSplashImage(splashInfo));
  };
  return (
    <Container>
      {images.map(image => {
        const { thumbImageSrc } = image;
        return (
          <ThumbImage
            src={thumbImageSrc}
            key={thumbImageSrc}
            onMouseDown={imageSelectHandler.bind(this, image)}
          />
        );
      })}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ThumbImage = styled.img`
  width: 30%;
  margin: 5px;
  &:hover {
    border: 2px solid green;
    cursor: pointer;
  }
`;
