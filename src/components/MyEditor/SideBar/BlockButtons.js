import React from "react";
import styled from "styled-components";

const images = [
  "icons/editor/block/code.svg",
  "icons/editor/block/dash.svg",
  "icons/editor/block/photo.svg",
  "icons/editor/block/search.svg",
  "icons/editor/block/video.svg"
];

export default function BlockButtons({ isOpen }) {
  console.log("isOpen", isOpen);
  return (
    <ButtonsContainer isOpen={isOpen}>
      {images.map((image, i) => (
        <Button isOpen={isOpen} i={i} key={image}>
          <Image src={image} alt={image} />
        </Button>
      ))}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
z-index:-1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid black;
  margin-left: 10px;
  background-color: white;
  cursor: pointer;
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)}
  transform: ${({ isOpen, i }) =>
    isOpen ? "translateX(0);" : `translateX(-${46 * (i + 1)}px);`}
  transition: transform .3s cubic-bezier(.5,-0.5,.5,1.5), opacity .3s ease-in;
`;

const Image = styled.img``;
