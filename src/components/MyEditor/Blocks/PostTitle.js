import React from "react";
import styled from "styled-components";

export default function PostTitle({ data }) {
  return <Title>{data}</Title>;
}

const Title = styled.div`
  font-size: 40px;
  color: black;
  margin: 20px;
`;
