import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { actions, selectors } from "data";
import DeleteTag from "components/DeleteTag";
import Helmet from "components/Helmet";
import LoadingPage from "pages/LoadingPage";
import { Card } from "components";

// import { posts } from "models/dummyData/posts";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector(selectors.post.getPosts);
  const currentTag = useSelector(selectors.post.getCurrentTag);
  const getPostsStatusRemote = useSelector(selectors.post.getPostsStatusRemote);

  useEffect(() => {
    if (currentTag) {
      dispatch(actions.post.getPosts({ tagId: currentTag.id }));
    } else {
      dispatch(actions.post.getPosts());
    }
  }, [currentTag, dispatch]);

  const postClickHandler = postId => {
    dispatch(actions.router.push(`/postDetail/${postId}`));
  };

  const DisplayPosts = () =>
    posts.length === 0 ? (
      <DeleteTag tagId={currentTag.id} />
    ) : (
      <>
        {posts.map(
          (
            { id, titlePhoto, title, subTitle, createdAt, Tags, User },
            index
          ) => (
            <Card.PostCard
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
      </>
    );

  return (
    <>
      <Helmet title="log" description="blog main page" />

      {getPostsStatusRemote.cata({
        NotAsked: () => <LoadingPage>loading 중입니다.</LoadingPage>,
        Loading: () => <LoadingPage>loading 중입니다.</LoadingPage>,
        Success: () => <DisplayPosts />,
        Failure: () => <div>서버상에 오류가 발생했습니다.</div>
      })}
    </>
  );
}
