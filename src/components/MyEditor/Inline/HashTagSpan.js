import React from "react";
import styled from "styled-components";
import { theme } from "theme";

export default function HashTagSpan({ children }) {
  return <Span>{children}</Span>;
}

const Span = styled.span`
  border-radius: 5px;
  padding: 2px;
  background-color: ${theme["color-basic-300"]};
  color: ${theme["color-basic-900"]};
`;
