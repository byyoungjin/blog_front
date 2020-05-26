import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { actions, selectors } from "data";
import { Post } from "components";
import TagsBox from "components/Tags";
import DeleteTag from "components/DeleteTag";
import { DefaultLayout } from "layout";
// import { posts } from "models/dummyData/posts";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.post.getPosts);
  const currentTag = useSelector(selectors.post.getCurrentTag);

  useEffect(() => {
    if (currentTag) {
      dispatch(actions.post.getPosts({ tagId: currentTag.id }));
    } else {
      dispatch(actions.post.getPosts());
    }
  }, [currentTag]);

  const postClickHandler = postId => {
    dispatch(actions.router.push(`/postDetail/${postId}`));
  };

  const DisplayPosts = () =>
    posts.length === 0 ? (
      <DeleteTag tagId={currentTag.id} />
    ) : (
      <PostContainer>
        {posts.map(
          (
            { id, titlePhoto, title, subTitle, createdAt, Tags, User },
            index
          ) => (
            <Post
              key={title + createdAt}
              titlePhoto={titlePhoto}
              title={title}
              subTitle={subTitle}
              createdAt={createdAt}
              onClick={postClickHandler.bind(this, id)}
              tagsProp={Tags}
              user={User}
            />
          )
        )}
      </PostContainer>
    );

  return (
    <MainContainer>
      <TagsBox />
      <DisplayPosts />
    </MainContainer>
  );
}

const MainContainer = styled.div`
  height: 100%;
  grid-area: contents;
  display: flex;
  flex-direction: column;
`;

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
