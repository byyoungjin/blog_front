import React from "react";
import styled from "styled-components";

export default function QuoteBlock({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  font-size: 24px;
  padding: 12px;
  color: ${({ theme }) => theme.colors.gray_light};
  border-left: 10px solid ${({ theme }) => theme.colors.gray_light};
  margin: 10px;
`;
