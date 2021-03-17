import React from "react";
import styled from "styled-components";

import { Text } from "components";
import { WithSelectable } from "hocs";
import { useTags } from "hooks";

export default function TagGroup({ tags, direction, isSelectable, ...rest }) {
  const { currentTagName, updateCurrentTag } = useTags();

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
`;

const TextContainer = styled.div`
  margin: ${({ direction }) => (direction === "column" ? "10px 0" : "0 10px")};
`;
