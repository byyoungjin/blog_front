import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";

export default function SplashSelect({ images }) {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const imageSelectHandler = splashInfo => {
    dispatch(actions.editorState.addSplashImage({ splashInfo, editorState }));
  };
  return (
    <Container>
      {images.map(image => {
        const { thumbImageSrc } = image;
        return (
          <ThumbImage
            src={thumbImageSrc}
            key={thumbImageSrc}
            onClick={imageSelectHandler.bind(this, image)}
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
