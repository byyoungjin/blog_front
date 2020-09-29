import React from "react";
import styled from "styled-components";

export default function SubjectBlock({ children }) {
  return <Container>{children}</Container>;
}

const Container = styled.div`
  font-size: 30px;
  font-weight: 500;
  margin-left: -20px;
`;
