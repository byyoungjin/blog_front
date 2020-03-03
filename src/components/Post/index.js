import React from "react";
import styled from "styled-components";
import { format } from "date-fns";

import colors from "theme/colors";

export default function Post({ style, url, title, subTilte, contents, date }) {
  const formatedDate = format(date, "yyyy/MM/dd");
  return (
    <PostContainer style={style}>
      <ImageBox src={url} />
      <TextBox>
        <Subtitle>{subTilte}</Subtitle>
        <Title>{title}</Title>
        <Contents>{contents}</Contents>
      </TextBox>
      <DateOverlay>{formatedDate}</DateOverlay>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  cursor: pointer;
  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
`;

const ImageBox = styled.img`
  width: 100%;
  height: 300px;
  border: none;
  border-radius: 10px 10px 0 0;
  object-fit: cover;
`;

const TextBox = styled.div`
  margin: 10px;
`;

const Title = styled.div`
  color: ${colors.blueGray};
  font-size: 32px;
  margin-bottom: 10px;
`;

const Subtitle = styled.div`
  color: ${colors.blue_light};
  font-size: 24px;
`;

const Contents = styled.div`
  height: 100px;
  color: ${colors.gray_light};
  font-size: 16px;
  overflow: hidden;
`;

const DateOverlay = styled.div`
  position: absolute;
  top: 0;
  border-radius: 10px;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  opacity: 0.5;
  z-index: 1;
  color: white;
  font-size: 40px;
  display: none;

  ${PostContainer}:hover & {
    display: flex;
  }
`;
