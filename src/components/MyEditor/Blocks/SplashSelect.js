import React, { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { actions } from "data";
import { Row } from "components/Layout";

export default function SplashSelect({ images }) {
  const dispatch = useDispatch();

  const imageSelectHandler = splashInfo => {
    dispatch(actions.editorState.selectSplashImage(splashInfo));
  };
  const firstRowImages = images.slice(0, 3);
  const secondRowImages = images.slice(3, 6);
  const thirdRowImages = images.slice(6, 9);

  const imagesRows = [
    [...firstRowImages],
    [...secondRowImages],
    [...thirdRowImages]
  ];

  return (
    <Container>
      {imagesRows.map((RowImages, index) => (
        <ImageRow key={index}>
          {RowImages.map(image => {
            const { thumbImageSrc, imageHeight, imageWidth } = image;
            const flexValue = imageWidth / imageHeight;
            return (
              <ThumbImage
                src={thumbImageSrc}
                key={thumbImageSrc}
                onMouseDown={imageSelectHandler.bind(this, image)}
                flexValue={flexValue}
                text="image"
              />
            );
          })}
        </ImageRow>
      ))}
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

const ImageRow = styled(Row.CenterCenter)`
  width: 100%;
  height: auto;
`;

const ThumbImage = styled.img`
  width: 1%;
  height: auto;
  flex: ${({ flexValue }) => flexValue} 1 0;
  border: 3px solid white;
  &:hover {
    border: 3px solid ${({ theme }) => theme.colors.yellow};
    cursor: pointer;
    opacity: 0.5;
  }
`;
