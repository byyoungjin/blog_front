import React from "react";
import styled from "styled-components";
import Colors from "theme/colors";

export default function InfoModal({ content }) {
  return <ModalComp>{content}</ModalComp>;
}

const ModalComp = styled.div`
display:flex;
justify-content: center;
align-items: center;
text-align:center;
width: 100px;
height: 100px
line-height:100px;
border: solid black;
background-color:${Colors.yellow}

`;
