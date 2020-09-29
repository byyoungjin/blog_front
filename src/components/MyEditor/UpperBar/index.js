import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";

import { selectors, actions } from "data";
import { colors } from "theme";
import { useUppperBarPosition } from "../hooks";
import LinkInput from "components/MyEditor/Blocks/LinkInput";

const UpperBarComp = ({ editorRef }) => {
  const dispatch = useDispatch();
  const editorState = useSelector(selectors.editorState.getEditorState);
  const upperBarPosition = useUppperBarPosition({ editorRef });
  const isLinkInput = useSelector(selectors.editorState.getIsLinkInput);

  const inlineButtons = [
    {
      title: "bold",
      image: process.env.PUBLIC_URL + "/icons/editor/inline/bold.svg",
      onClick: () =>
        dispatch(
          actions.editorState.toggleInline({ editorState, inlineStyle: "BOLD" })
        )
    },
    {
      title: "italic",
      image: process.env.PUBLIC_URL + "/icons/editor/inline/italic.svg",
      onClick: () => {
        dispatch(
          actions.editorState.toggleInline({
            editorState,
            inlineStyle: "ITALIC"
          })
        );
      }
    },
    {
      title: "link",
      image: process.env.PUBLIC_URL + "/icons/editor/inline/link.svg",
      onClick: () => {
        dispatch(actions.editorState.toggleIsLinkInput(true));
      }
    }
  ];

  const blockButtons = [
    {
      title: "subject",
      image: process.env.PUBLIC_URL + "/icons/editor/inline/subject.svg",
      onClick: () =>
        dispatch(
          actions.editorState.toggleBlock({ editorState, blockType: "subject" })
        )
    },
    {
      title: "quote",
      image: process.env.PUBLIC_URL + "/icons/editor/inline/quote.svg",
      onClick: () =>
        dispatch(
          actions.editorState.toggleBlock({
            editorState,
            blockType: "quoteBlock"
          })
        )
    },
    {
      title: "subTitle",
      image: process.env.PUBLIC_URL + "/icons/editor/inline/subTitle.svg",
      onClick: () =>
        dispatch(
          actions.editorState.toggleBlock({
            editorState,
            blockType: "subTitle"
          })
        )
    },
    {
      title: "title",
      image: process.env.PUBLIC_URL + "/icons/editor/inline/title.svg",
      onClick: () =>
        dispatch(
          actions.editorState.toggleBlock({ editorState, blockType: "title" })
        )
    }
  ];

  const upperBarContents = isLinkInput ? (
    <LinkInput />
  ) : (
    <>
      {inlineButtons.map(button => (
        <Button key={button.title}>
          <img
            src={button.image}
            alt={button.title}
            onMouseDown={button.onClick}
          />
        </Button>
      ))}
      <Seperator />
      {blockButtons.map(button => (
        <Button key={button.title}>
          <img
            src={button.image}
            alt={button.title}
            onMouseDown={button.onClick}
          />
        </Button>
      ))}
    </>
  );

  return <UpperBar style={upperBarPosition}>{upperBarContents}</UpperBar>;
};

export default UpperBarComp;

const Seperator = styled.div`
  display: inline-block;
  border-right: 1px solid #ddd;
  height: 24px;
  margin: 0 0.5em;
`;

const UpperBar = styled.div`
  width: 300px;
  height: 51px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${colors.black_84};
  border-radius: 20px;
  position: absolute;
`;

const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  margin: 0 10px;
  cursor: pointer;
  &:after {
    top: 100%;
    left: 50%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  &:after {
    border-color: rgba(255, 255, 255, 0);
    border-top-color: ${colors.black_84};
    border-width: 4px;
    margin-left: -4px;
  }
`;

const ImageButton = styled.img`
  width: 20px;
  color: white;
`;
