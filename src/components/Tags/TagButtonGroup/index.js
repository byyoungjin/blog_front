import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import TagButton from "./TagButton";
import api from "api";
import { actions, selectors } from "data";

export default function TagsComp({ tagsProp }) {
  const dispatch = useDispatch();
  const allTags = useSelector(selectors.post.getTags);
  const userId = useSelector(selectors.user.getUserId);
  const allTagsAndAllbutton = [{ id: 0, tagName: "ALL" }, ...allTags];
  const tags = tagsProp ? tagsProp : allTagsAndAllbutton;

  const isFunctional = tagsProp ? false : true;

  useEffect(() => {
    if (!tagsProp) {
      if (userId) {
        dispatch(actions.post.getTagsByUserId(userId));
      } else {
        dispatch(actions.post.getTagsByUserId(1));
      }
    }
  }, []);

  return (
    <TagsContainer>
      {tags.map(tagInfo => (
        <TagButton
          tagInfo={tagInfo}
          isFunctional={isFunctional}
          key={tagInfo.id}
        />
      ))}
    </TagsContainer>
  );
}

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;

  margin: 20px;
  border-radius: 10px;
`;
