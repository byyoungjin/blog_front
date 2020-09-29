import React from "react";
import styled from "styled-components";

export default function SplashImage({ splashInfo }) {
  return (
    <Container>
      <FullImage
        src={splashInfo.regularImageSrc}
        onClick={() => console.log("clicked")}
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
  width: 100%;
  height: 100%;
  border: 3px solid white;
  // &:hover {
  //   border: 3px solid ${({ theme }) => theme.colors.yellow};
  // }
`;

const Attribute = styled.div`
  font-size: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  color: gray;
`;

const A = styled.a`
  text-decoration: none;
  color: black;
`;
