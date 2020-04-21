import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { useEditorState } from "../hooks";
import { actions } from "data";

export default function BlockButtons({ isOpen }) {
  const [editorState] = useEditorState();
  const fileInput = useRef(null);
  const dispatch = useDispatch();

  const photoUplaodHandler = () => {
    fileInput.current.click();
  };

  const buttons = [
    { title: "photo", image: "icons/editor/block/dash.svg", onClick: () => {} },
    { title: "code", image: "icons/editor/block/code.svg", onClick: () => {} },
    {
      title: "photo",
      image: "icons/editor/block/photo.svg",
      onClick: photoUplaodHandler
    },
    {
      title: "search",
      image: "icons/editor/block/search.svg",
      onClick: () => {}
    },
    { title: "video", image: "icons/editor/block/video.svg", onClick: () => {} }
  ];

  const fileSelectHandler = e => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      dispatch(actions.editorState.addImage({ selectedFile, editorState }));
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <ButtonsContainer isOpen={isOpen}>
      {buttons.map((button, i) => (
        <Button
          isOpen={isOpen}
          i={i}
          key={button.image}
          onClick={button.onClick}
        >
          <Image src={button.image} alt={button.image} />
          {button.title === "photo" && (
            <input
              style={{ display: "none" }}
              type="file"
              onChange={fileSelectHandler}
              ref={fileInput}
            />
          )}
        </Button>
      ))}
    </ButtonsContainer>
  );
}

const ButtonsContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Button = styled.div`
z-index:${({ isOpen }) => (isOpen ? 0 : -1)};
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
  opacity: ${({ isOpen }) => (isOpen ? 1 : 0)}
  transform: ${({ isOpen, i }) =>
    isOpen ? "translateX(0);" : `translateX(-${46 * (i + 1)}px);`}
  transition: transform .3s cubic-bezier(.5,-0.5,.5,1.5), opacity .3s ease-in;
`;

const Image = styled.img``;
