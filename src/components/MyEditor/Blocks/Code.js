import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export default function CodeBlock({ contentState, block, children }) {
  // const container = useRef(null);
  // useEffect(() => {
  //   container.current.focus();
  // }, []);
  return <Container>{children}</Container>;
}

const Container = styled.pre`
  background-color: ${({ theme }) => theme.colors.gray_light};
  padding: 20px;
  border-radius: 20px;
  margin: 20px 10px;
`;
