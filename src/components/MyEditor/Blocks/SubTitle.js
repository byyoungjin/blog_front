import React from "react";
import styled from "styled-components";

export default function SubTitle({ children }) {
  return <Containeer>{children}</Containeer>;
}

const Containeer = styled.div`
  font-size: 24px;
  padding: 3px 12px 12px;

  color: gray;
`;
