import React from "react";
import styled from "styled-components";

export default function DashComp({ children }) {
  return <Dash>{children}</Dash>;
}

const Dash = styled.div`
  width: 100%;
  border-bottom: 1px solid gray;
`;
