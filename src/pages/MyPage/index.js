import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { Post } from "components";
import { DefaultLayout } from "layout";
import { posts } from "models/dummyData/posts";
import { ProfilePicture, Button } from "components";
import { user } from "models/dummyData/user";
import { colors } from "theme";
import { actions } from "data";

export default function Mypage() {
  const dispatch = useDispatch();

  const logoutHandler = () => dispatch(actions.user.logout());
  return (
    <DefaultLayout logo navigation addPost>
      <ContentsContainer>
        <MyProfile>
          <ProfilePicture src={user.pictureUrl} diameter="300px" />
          <Name>하영진</Name>
          <MyPageUrl>hyjpost.com/@teen14y</MyPageUrl>
          <Button onClick={logoutHandler}>로그아웃</Button>
        </MyProfile>
        <Label>내 포스트</Label>
        <PostContainer>
          {posts.map(({ url, title, subTitle, contents, date }, index) => (
            <Post
              key={title + index}
              url={url}
              title={title}
              subTilte={subTitle}
              contents={contents}
              date={date}
            />
          ))}
        </PostContainer>
      </ContentsContainer>
    </DefaultLayout>
  );
}

const ContentsContainer = styled.div`
  grid-area: contents;
`;

const MyProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px;
  height: 100vh;
  widht: 100%;
`;

const Name = styled.div`
  font-size: 40px;
  margin-top: 50px;
`;

const MyPageUrl = styled.div`
  font-size: 40px;
  color: ${colors.blueGray};
  margin-bottom: 50px;
`;

const Label = styled.div`
  font-size: 40px;
  margin: 20px 0;
`;

const PostContainer = styled.div`
  height: 100%;
  display: grid;
  gap: 50px 20px;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 500px;
  grid-auto-rows: 500px;

  @media (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 1000px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
