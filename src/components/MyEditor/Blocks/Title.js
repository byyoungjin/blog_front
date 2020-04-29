import React from "react";
import styled from "styled-components";

export default function Title({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  font-size: 36px;
  padding: 12px;
  color: black;
`;
