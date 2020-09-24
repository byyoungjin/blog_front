import React from "react";
import styled from "styled-components";

export default function ParagraphComp({ children }) {
  return <Paragraph>{children}</Paragraph>;
}

const Paragraph = styled.div`
  margin: 29px 0 0;
  font-size: 16px;
  line-height: 1.8;
`;
