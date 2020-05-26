import React, { useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import { Post } from "components";
import { DefaultLayout } from "layout";
import { posts } from "models/dummyData/posts";
import { ProfilePicture, Button } from "components";
import { user } from "models/dummyData/user";
import { colors } from "theme";
import { actions, selectors } from "data";

export default function Mypage() {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.post.getPosts);
  const userId = useSelector(selectors.user.getUserId);
  const { firstName, lastName, emailAddress } = useSelector(
    selectors.user.getUserSession
  );
  const name = firstName + " " + lastName;
  useEffect(() => {
    dispatch(actions.post.getPosts({ userId }));
  }, []);

  const postClickHandler = postId => {
    dispatch(actions.router.push(`/postDetail/${postId}`));
  };

  const logoutHandler = () => dispatch(actions.user.logout());
  return (
    <ContentsContainer>
      <MyProfile>
        <ProfilePicture src={user.pictureUrl} diameter="300px" />
        <Name>{name}</Name>
        <MyPageUrl>hyjpost.com/{emailAddress}</MyPageUrl>
        <Button onClick={logoutHandler}>로그아웃</Button>
      </MyProfile>
      <Label>내 포스트</Label>
      <PostContainer>
        {posts.map(
          ({ id, titlePhoto, title, subTitle, createdAt, Tags }, index) => (
            <Post
              key={title + createdAt}
              titlePhoto={titlePhoto}
              title={title}
              subTitle={subTitle}
              createdAt={createdAt}
              onClick={postClickHandler.bind(this, id)}
              tagsProp={Tags}
              user={{ firstName, lastName }}
            />
          )
        )}
      </PostContainer>
    </ContentsContainer>
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
