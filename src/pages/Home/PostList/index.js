import React from "react";
import styled from "styled-components";
import Post from "pages/Home/Post";

export default function PostList() {
  return (
    <>
      <PostsWrapper>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </PostsWrapper>
    </>
  );
}

const PostsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  width: 70%;
`;
