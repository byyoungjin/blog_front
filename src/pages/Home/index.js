import React from "react";
import styled from "styled-components";

import HeaderNavigation from "components/HeaderNavigation";
import PostList from "pages/Home/PostList";
import HeaderImage from "components/HeaderImage";
import * as pallete from "styleVariables";

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
  background-color: ${pallete.backgroundGrey};
`;
