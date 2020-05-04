import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";
import { Post } from "components";
import { DefaultLayout } from "layout";
// import { posts } from "models/dummyData/posts";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.post.getPosts);
  console.log("posts", posts);

  useEffect(() => {
    dispatch(actions.post.getPosts());
  }, []);

  const postClickHandler = postId => {
    dispatch(actions.router.push(`/postDetail/${postId}`));
  };

  return (
    <PostContainer>
      {posts.map(({ id, titlePhoto, title, subTitle, createdAt }, index) => (
        <Post
          key={title + createdAt}
          titlePhoto={titlePhoto}
          title={title}
          subTitle={subTitle}
          createdAt={createdAt}
          onClick={postClickHandler.bind(this, id)}
        />
      ))}
    </PostContainer>
  );
}

const PostContainer = styled.div`
  height: 100%;
  grid-area: contents;
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
