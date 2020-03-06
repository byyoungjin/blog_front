import React from "react";
import styled from "styled-components";

const code = "icons/editor/block/code.svg";
const dash = "icons/editor/block/dash.svg";
const photo = "icons/editor/block/photo.svg";
const search = "icons/editor/block/search.svg";
const video = "icons/editor/block/video.svg";

export default function BlockButtons() {
  return (
    <ButtonsContainer>
      <Button>
        <img src={photo} alt="camera" />
      </Button>
      <Button>
        <img src={search} alt="search" />
      </Button>
      <Button>
        <img src={video} alt="video" />
      </Button>
      <Button>
        <img src={code} alt="code" />
      </Button>
      <Button>
        <img src={dash} alt="dash" />
      </Button>
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 3px solid black;
  margin-left: 10px;
  background-color: white;
  cursor: pointer;
`;
