import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { readFile } from "../helper";
import { useInsertHandlers } from "./hooks";
import { actions, selectors } from "data";

export default function BlockButtons({ isOpen }) {
  const editorState = useSelector(selectors.editorState.getEditorState);
  const fileInput = useRef(null);
  const dispatch = useDispatch();
  const userId = useSelector(selectors.user.getUserId);

  const [
    insertDashHandler,
    insertCodeHandler,
    insertSearchHandler,
    insertVideoHandler
  ] = useInsertHandlers(editorState);

  const photoUplaodHandler = () => {
    fileInput.current.click();
  };

  const buttons = [
    {
      title: "dash",
      image: process.env.PUBLIC_URL + "/icons/editor/block/dash.svg",
      onClick: insertDashHandler
    },
    {
      title: "code",
      image: process.env.PUBLIC_URL + "/icons/editor/block/code.svg",
      onClick: insertCodeHandler
    },
    {
      title: "photo",
      image: process.env.PUBLIC_URL + "/icons/editor/block/photo.svg",
      onClick: photoUplaodHandler
    },
    {
      title: "search",
      image: process.env.PUBLIC_URL + "/icons/editor/block/search.svg",
      onClick: insertSearchHandler
    },
    {
      title: "video",
      image: process.env.PUBLIC_URL + "/icons/editor/block/video.svg",
      onClick: insertVideoHandler
    }
  ];

  const fileSelectHandler = e => {
    const files = e.target.files;
    const selectedFile = files[0];
    const onLoadHandler = selectedFile =>
      dispatch(
        actions.editorState.addImage({ selectedFile, editorState, userId })
      );
    onLoadHandler(selectedFile);
    // readFile({ files, onLoadHandler });
    e.target.value = "";
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
