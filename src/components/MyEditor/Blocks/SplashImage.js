import React, { useState } from "react";
import styled from "styled-components";

export default function SplashImage({ splashInfo }) {
  const [imageSize, setImageSize] = useState();
  const [imageFit, setImageFit] = useState();
  const [isOpenController, setIsOpenController] = useState(false);
  return (
    <Container>
      {/* {isOpenController && (
        <>
          <div onClick={() => setImageSize(100)}>100</div>
          <div onClick={() => setImageSize(200)}>200</div>
          <div onClick={() => setImageSize(300)}>300</div>
        </>
      )} */}
      <FullImage
        src={splashInfo.regularImageSrc}
        alt="splash-image"
        imageSize={imageSize}
        imageFit={imageFit}
        onClick={() => {
          setIsOpenController(prev => !prev);
        }}
      />
      <Attribute>
        Photo by{" "}
        <A
          href={`${splashInfo.userProfile}?utm_source=your_app_name&utm_medium=referral`}
        >
          {splashInfo.userName + " "}
        </A>
        on{" "}
        <A href="https://unsplash.com/?utm_source=your_app_name&utm_medium=referral">
          Unsplash
        </A>
      </Attribute>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
`;
const FullImage = styled.img`
  width: auto;
  height: auto;
  object-fit:contain;
  max-height:70vh;
  border: 3px solid white;
  cursor: pointer
  // &:hover {
  //   border: 3px solid ${({ theme }) => theme.colors.yellow};
  // }
`;

const Attribute = styled.div`
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: gray;

  @media (min-width: 600px) {
    font-size: 12px;
  }
`;

const A = styled.a`
  text-decoration: none;
  color: black;
`;
