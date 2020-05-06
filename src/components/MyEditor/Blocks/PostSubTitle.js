import React from "react";
import styled from "styled-components";

export default function PostSubTitle({ data }) {
  return <SubTitle>{data}</SubTitle>;
}

const SubTitle = styled.div`
  font-size: 32px;
  color: gray;
  margin: 10px;
`;
