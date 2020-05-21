import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import TagButton from "./TagButton";
import api from "api";
import { actions, selectors } from "data";

export default function TagsComp() {
  const dispatch = useDispatch();
  const tags = useSelector(selectors.post.getTags);
  useEffect(() => {
    dispatch(actions.post.getAllTags());
  }, []);

  return (
    <TagsContainer>
      {tags.map(tagInfo => (
        <TagButton tagInfo={tagInfo} key={tagInfo.id} />
      ))}
    </TagsContainer>
  );
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  height: 100%;
  margin: 20px;
  border-radius: 10px;
`;
