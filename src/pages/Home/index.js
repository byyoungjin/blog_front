import React from "react";
import styled from "styled-components";

import HeaderImage from "components/HeaderImage";
import HeaderNavigation from "components/HeaderNavigation";
import PostList from "pages/Home/PostList";

export default function Home() {
  return (
    <div>
      <HeaderImage />
      <HeaderNavigation />
      <PostListContainer>
        <PostList />
      </PostListContainer>
    </div>
  );
}

const PostListContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f6f9fc;
`;
