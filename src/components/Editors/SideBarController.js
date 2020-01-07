import React, { useRef } from "react";
import styled from "styled-components";
import { EditorState, AtomicBlockUtils } from "draft-js";

export default function SideBarController({
  editorState,
  onChange,
  contentState
}) {
  const fileInput = useRef(null);

  const fileSelectHandler = e => {
    console.log("file changed");
    getFileImg(e);
  };

  const getFileImg = e => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();
    reader.onload = e => addImage(e.target.result);
    reader.readAsDataURL(selectedFile);
  };

  const addImage = src => {
    onChange(addMedia("image", src));
  };

  const addMedia = (type, src) => {
    if (!src) {
      return;
    }
    const contentStateWithEntity = contentState.createEntity(
      type,
      "IMMUTABLE",
      { src }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    const newState = AtomicBlockUtils.insertAtomicBlock(
      newEditorState,
      entityKey,
      " "
    );
    return newState;
  };

  return (
    <>
      {/* <StyledImg src={selectedImage} alt={"uploaded"} /> */}
      <input
        style={{ display: "none" }}
        type={"file"}
        onChange={fileSelectHandler}
        ref={fileInput}
      />
      <button onClick={() => fileInput.current.click()}>이미지</button>
    </>
  );
}

const StyledImg = styled.img`
  width: 100%;
`;
