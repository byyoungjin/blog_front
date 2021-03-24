import React from "react";
import styled from "styled-components";

import { Text } from "components";

export default function TagGroup({
  tags,
  direction,
  isSelectable,
  currentTagName,
  updateCurrentTag,
  ...rest
}) {
  return (
    <TagsContainer direction={direction} {...rest}>
      {tags.map(tagInfo => (
        <TextContainer direction={direction} key={tagInfo.id}>
          {isSelectable ? (
            <Text.S1Selectable
              isSelected={currentTagName === tagInfo.tagName}
              onSelect={() => updateCurrentTag(tagInfo)}
            >
              {tagInfo.tagName}
            </Text.S1Selectable>
          ) : (
            <Text.S1>{tagInfo.tagName}</Text.S1>
          )}
        </TextContainer>
      ))}
    </TagsContainer>
  );
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ direction }) => (direction ? direction : "row")};
  width: 20vw;
`;

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: "stretch";
  margin: ${({ direction }) => (direction === "column" ? "10px 0" : "0 10px")};
  max-width: 100%;
  overflow: scroll;
`;
