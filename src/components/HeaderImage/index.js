import React from "react";
import styled from "styled-components";
import image from "components/HeaderImage/coverImage.JPG";

export default function HeaderImage() {
  return (
    <div>
      <Cover></Cover>
      <TransParentBlock></TransParentBlock>
    </div>
  );
}

const Cover = styled.div`
  position: fixed;
  z-index: -1;
  width: 100%;
  height: 100vh;
  background-image: url(${image});
  background-size: cover;
  background-position: center;
`;
const TransParentBlock = styled.div`
  height: 100vh;
  opacity: 0.5;
  background: linear-gradient(#2175bf, #000000);
`;
