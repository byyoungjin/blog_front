import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import HeaderNavigation from "components/HeaderNavigation";
import PostList from "pages/Home/PostList";
import HeaderImage from "components/HeaderImage";
import * as pallete from "styleVariables";
import { getUserSession } from "data/user/selectors";

export default function Home() {
  const user = useSelector(getUserSession);
  return (
    <div>
      <HeaderImage />
      <HeaderNavigation user={user} />
      <PostListContainer>
        <PostList user={user} />
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
