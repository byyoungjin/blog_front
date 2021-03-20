import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import styled from "styled-components";

import { actions, selectors } from "data";
import Colors from "theme/colors";
import { Col, Row } from "components/Layout";

export default function EditorDetialHeader() {
  const currentPost = useSelector(selectors.post.getCurrentPost);

  let tags, userName, formatedDate;
  if (currentPost) {
    tags = currentPost.Tags.reduce((totalString, tag) => {
      return totalString + " " + tag.tagName;
    }, "");

    userName = currentPost.User.firstName + " " + currentPost.User.lastName;

    const { createdAt } = currentPost;
    formatedDate = format(new Date(createdAt), "MMM dd. yyyy");
  }

  return (
    <Col.Start style={{ marginBottom: 20 }}>
      <Tags>{tags}</Tags>
      <Row.Center>
        <HandWriting>by</HandWriting>
        <UserInfo>{userName}</UserInfo>
        <CreatedAt>{formatedDate}</CreatedAt>
      </Row.Center>
    </Col.Start>
  );
}

const HandWriting = styled.div`
  font-family: "Permanent Marker", cursive;
  font-size: 16px;
  color: ${Colors.blue_light};
  margin-right: 10px;
`;

const UserInfo = styled.div`
  color: ${Colors.blue_light};
  font-size: 16px;
  font-family: "Jua";
  margin-right: 20px;
`;

const CreatedAt = styled.div`
  color: ${Colors.blue_light};
  font-size: 16px;
  font-family: "Jua";
`;

const Tags = styled.div`
  color: ${Colors.blue_light};
  font-size: 16px;
  margin-bottom: 5px;
`;
