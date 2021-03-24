import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { actions, selectors } from "data";

export const useTags = () => {
  const dispatch = useDispatch();
  const userId = useSelector(selectors.user.getUserId);
  const allTags = useSelector(selectors.post.getTags);
  const allTagsAndAllbutton = [{ id: 0, tagName: "ALL" }, ...allTags];

  const currentTag = useSelector(selectors.post.getCurrentTag);
  const currentTagName = useSelector(selectors.post.getCurrentTagName);

  const updateCurrentTag = tagInfo => {
    dispatch(actions.post.updateCurrentTag(tagInfo));
  };

  useEffect(() => {
    if (userId) {
      console.log("call tags");
      dispatch(actions.post.getTagsByUserId(userId));
    } else {
      dispatch(actions.post.getTagsByUserId(1));
    }
  }, [userId]);

  return {
    tags: allTagsAndAllbutton,
    currentTag,
    currentTagName,
    updateCurrentTag
  };
};

export default useTags;
