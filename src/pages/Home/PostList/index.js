import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import Post from "pages/Home/Post";
import { actions, selectors } from "data";

export default function PostList({ user }) {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.post.getPosts);
  const userId = user?.id;

  useEffect(() => {
    dispatch(actions.post.getPosts(userId));
  }, []);
  return (
    <>
      <PostsWrapper>
        {posts.map(post => {
          return <Post key={post.id} postId={post.id} />;
        })}
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
