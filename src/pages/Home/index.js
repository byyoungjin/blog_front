import React from "react";
import styled from "styled-components";

import HeaderNavigation from "components/HeaderNavigation";
import PostList from "pages/Home/PostList";
import * as pallete from "styleVariables";

export default function Home() {
  return (
    <div>
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
  background-color: ${pallete.backgroundGrey};
`;
