import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import colors from "theme/colors";
import { Tag } from "components";
import winSize from "utils/winSize";
import { Row, Col } from "components/Layout";
import { theme } from "theme";
import { useFade } from "hooks";

const defaultCover = process.env.PUBLIC_URL + "/images/default_cover_image.svg";

export default function Post({
  style,
  titlePhoto,
  title,
  subTitle,
  createdAt,
  onClick,
  tagsProp,
  user
}) {
  const formatedDate = format(new Date(createdAt), "yyyy/MM/dd");
  const { firstName = "", lastName = "" } = user ? user : {};
  const userName = firstName + " " + lastName;

  const { FadeWrapper } = useFade();

  return (
    <FadeWrapper>
      <Col.Default
        style={{ marginBottom: 30, positino: "relative", width: "100%" }}
      >
        <Row.Default>
          <CreatedInfo>{formatedDate}</CreatedInfo>
          <UserInfo>, by {userName}</UserInfo>
          <Tag.Group tags={tagsProp} direction="row" />
        </Row.Default>
        <PostContainer style={style} onClick={onClick}>
          <ImageBox src={titlePhoto ? titlePhoto : defaultCover} />
          <TextBox>
            <Title>{title === "" ? "무제" : title}</Title>
            <Subtitle>{subTitle}</Subtitle>
            <Divider />
          </TextBox>
          <DateOverlay>{formatedDate}</DateOverlay>
        </PostContainer>
      </Col.Default>
    </FadeWrapper>
  );
}

const PostContainer = styled.div`
  display: flex;
  flex-direction: column;

  border-radius: 8px;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;

  @media (min-width: 600px) {
    flex-direction: row;
    height: 200px;
    overflow: hidden;
  }

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  ${winSize.onLarge("min-width: 400px;")}
`;

const ImageBox = styled.img`
  width: 100%;
  height: 200px;
  border: none;
  border-radius: 8px 0 0 8px;
  object-fit: cover;
  @media (min-width: 600px) {
    width: 30%;
  }
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;
  height: 100%;
`;

const Title = styled.div`
  color: ${colors.blueGray};
  font-size: 24px;
  margin-bottom: 10px;

  @media (min-width: 600px) {
    font-size: 32px;
  }
`;

const Subtitle = styled.div`
  color: ${colors.blue_light};
  font-size: 20px;
  @media (min-width: 600px) {
    font-size: 24px;
  }
`;

const DateOverlay = styled.div`
  position: absolute;
  top: 0;
  border-radius: 10px;
  width: 100%;
  height: 200px;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  background-color: ${theme["color-basic-500"]};
  z-index: 1;
  color: white;
  font-size: 40px;
  display: none;

  ${PostContainer}:hover & {
    display: flex;
  }
`;

const UserInfo = styled.div`
  color: ${colors.blue_light};
  font-size: 16px;
`;

const CreatedInfo = styled.div`
  color: ${colors.blue_light};
  font-size: 16px;
`;

const Divider = styled.div`
  flex: 1;
`;
