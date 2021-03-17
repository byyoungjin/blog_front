import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";
import Colors from "theme/colors";

export default function TagButtonComp({ tagInfo, isFunctional }) {
  const dispatch = useDispatch();
  const currentTagName = useSelector(selectors.post.getCurrentTagName);
  const clickTagHandler = () => {
    dispatch(actions.post.updateCurrentTag(tagInfo));
  };

  const isCurrentTag = currentTagName === tagInfo.tagName;

  const { tagName, id } = tagInfo;
  return isFunctional ? (
    <TagFunctionalButton onClick={clickTagHandler} isCurrentTag={isCurrentTag}>
      {tagName}
    </TagFunctionalButton>
  ) : (
    <Tagbutton isCurrentTag={isCurrentTag}>{tagName}</Tagbutton>
  );
}

const Tagbutton = styled.div`
  margin: 5px;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  background-color: ${({ isCurrentTag }) =>
    isCurrentTag ? Colors.yellow : "white"};
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
`;

const TagFunctionalButton = styled(Tagbutton)`
  cursor: pointer;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;
