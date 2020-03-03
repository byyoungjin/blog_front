import React from "react";
import styled from "styled-components";

import { MainLogo, Navigation } from "components";

export default function DefaultLayoutComp({ logo, navigation, children }) {
  return (
    <DefaultLayout>
      {logo && <MainLogo />}
      {navigation && <Navigation />}
      {children}
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: 100px 1fr 100px;
  grid-template-rows: 100px 1fr;
  grid-template-areas:
    " logo nav . "
    ". contents . ";
`;
