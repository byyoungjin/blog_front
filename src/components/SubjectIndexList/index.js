import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import AnchorLink from "react-anchor-link-smooth-scroll";

import { selectors } from "data";
import { theme } from "theme";

export default function SubjectIndexList({ style }) {
  const editorState = useSelector(selectors.editorState.getEditorState);
  const contentSate = editorState.getCurrentContent();
  const blocks = contentSate.getBlocksAsArray();
  const subjectBlocks = blocks.filter(block => block.type === "subject");

  return (
    <ContaienrUl style={style}>
      {subjectBlocks.map(block => (
        <Li key={block.key}>
          <AnchorLink
            offset={10}
            href={`#${block.key}`}
            style={{ textDecoration: "none", color: theme["color-basic-500"] }}
            onClick={() =>
              window.history.pushState("", "block.text", `#${block.key}`)
            }
          >
            {block.text}
          </AnchorLink>
        </Li>
      ))}
    </ContaienrUl>
  );
}

const ContaienrUl = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Li = styled.li`
  text-decoration: none;
  list-style-type: none;
  padding: 0;
  margin: 5px 0;
`;
