import React from "react";
import styled from "styled-components";

import Colors from "theme/colors";

export default function Title({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  font-size: 40px;
  margin: 10px 10px 10px 0
  padding: 10px;
  color: black;
  &:hover{
    border-bottom: 3px solid black;
  }
  
`;
