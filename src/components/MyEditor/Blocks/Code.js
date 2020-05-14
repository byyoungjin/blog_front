import React, { useEffect, useRef } from "react";
import styled from "styled-components";

export default function CodeBlock({ contentState, block, children }) {
  const container = useRef(null);
  useEffect(() => {
    container.current.focus();
  }, []);
  return <Container ref={container}>{children}</Container>;
}

const Container = styled.div`
  background-color: lightGray;
  width: 100%;
  padding: 20px;
  border-radius: 20px;
  margin: 20px 10px;
`;
