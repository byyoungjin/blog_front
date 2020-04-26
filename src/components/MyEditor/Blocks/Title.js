import React from "react";
import styled from "styled-components";

export default function Title({ children }) {
  return <Containeer>{children}</Containeer>;
}

const Containeer = styled.div`
  font-size: 36px;
  padding: 12px;
  color: black;
`;
