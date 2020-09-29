import React from "react";
import styled from "styled-components";

export default function HandleSpan({ children }) {
  return <Span>{children}</Span>;
}

const Span = styled.span`
  border-radius: 5px;
  padding: 2px;
  background-color: red;
  color: white;
`;
