import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";

export default function SplashSelect({ images }) {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const container = useRef(null);
  useEffect(() => {
    container.current.focus();
  }, []);
  const imageSelectHandler = splashInfo => {
    dispatch(
      actions.editorState.addOtherMedia({
        data: splashInfo,
        editorState,
        type: "unsplash"
      })
    );
  };
  return (
    <Container ref={container}>
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
