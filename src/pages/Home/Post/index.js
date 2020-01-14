import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import image from "./profile.JPG";
import { actions } from "data";

export default function Post({ postId }) {
  const dispatch = useDispatch();
  const _handlePostClick = () => {
    dispatch(actions.post.getOnePost(postId));
  };
  return (
    <PostContainer onClick={_handlePostClick}>
      <CoverImage></CoverImage>
      <PostText>
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout. The point of
        using Lorem Ipsum is that it has a more-or-less normal distribution of
        letters, as opposed to using 'Content here, content here', making it
        look like readable English. Many desktop publishing packages and web
        page editors now use Lorem Ipsum as their default model text, and a
        search for 'lorem ipsum' will uncover many web sites still in their
        infancy. Various versions have evolved over the years, sometimes by
        accident, sometimes on purpose (injected humour and the like).
      </PostText>
    </PostContainer>
  );
}

const PostContainer = styled.div`
  margin: 10px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 8px 14px 38px rgba(39, 44, 49, 0.06),
    1px 3px 8px rgba(39, 44, 49, 0.03);
`;

const PostText = styled.div`
  margin: 10px;
`;

const CoverImage = styled.div`
  width: 100%;
  height: 20vh;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  background-image: url(${image});
  background-size: cover;
  background-position: center;
`;
