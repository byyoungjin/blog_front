import React from "react";
import styled from "styled-components";

export default function QuoteBlock({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  font-size: 36px;
  padding: 12px;
  color: black;
  border-left: 10px solid gray;
  margin: 10px;
`;
