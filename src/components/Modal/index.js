import React from "react";
import styled from "styled-components";

export default function Modal({ modal }) {
  return (
    <Container modal={modal}>
      <ModalComp>saved!</ModalComp>
    </Container>
  );
}

const Container = styled.div`
  position: absolute;
  z-index: 200;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  transform: ${({ modal }) =>
    modal.up ? "translateY(0);" : "translateY(-100%);"}
    opacity: ${({ modal }) => (modal.up ? "1" : "0")} ; 
  transition: transform .5s cubic-bezier(.5,-0.67,.42,1.34), opacity .5s cubic-bezier(.5,-0.67,.42,1.34);
`;

const ModalComp = styled.div`

width: 100px;
height: 100px
border: solid black;

`;
