import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import styled from "styled-components";

import { actions, selectors } from "data";
import Colors from "theme/colors";

export default function EditorDetialHeader() {
  const currentPost = useSelector(selectors.post.getCurrentPost);

  let tags, userName, formatedDate;
  if (currentPost) {
    tags = currentPost.Tags.reduce((totalString, tag) => {
      return totalString + " " + tag.tagName;
    }, "");

    userName = currentPost.User.firstName + " " + currentPost.User.lastName;

    const { createdAt } = currentPost;
    formatedDate = format(new Date(createdAt), "yyyy/MM/dd");
  }

  return (
    <>
      <UserInfo>by {userName}</UserInfo>
      <CreatedAt>{formatedDate}</CreatedAt>

      <Tags>{tags}</Tags>
    </>
  );
}

const UserInfo = styled.div`
  color: ${Colors.blue_light};
  font-size: 20px;
`;

const CreatedAt = styled.div`
  color: ${Colors.blue_light};
  font-size: 16px;
`;

const Tags = styled.div`
  color: ${Colors.blue_light};
  font-size: 16px;
`;
