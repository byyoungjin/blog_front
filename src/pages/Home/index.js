import React from "react";
import styled from "styled-components";

import { Post } from "components";
import { DefaultLayout } from "layout";
import { posts } from "models/dummyData/posts";

export default function Home() {
  return (
    <DefaultLayout logo navigation addPost>
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
    </DefaultLayout>
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
