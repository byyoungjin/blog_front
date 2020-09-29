import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import Helmet from "components/Helmet";
import { actions, selectors } from "data";
import LoadingPage from "pages/LoadingPage";

export default function PostDetailComp({ match }) {
  const dispatch = useDispatch();
  const getOnePostStatusRemote = useSelector(
    selectors.post.getOnePostStatusRemote
  );
  const { postId } = match.params;

  const title = useSelector(selectors.post.getTitle);
  const subTitle = useSelector(selectors.post.getSubTitle);

  useEffect(() => {
    dispatch(actions.post.getOnePostDetail(postId));

    return () => {
      dispatch(actions.post.resetOnePost());
      dispatch(actions.editorState.resetEditorState());
      dispatch(actions.editorState.toggleEditorReadOnly(false));
    };
  }, [dispatch, postId]);

  return (
    <>
      <Helmet title={title} description={subTitle} />
      {getOnePostStatusRemote.cata({
        NotAsked: () => <LoadingPage />,
        Loading: () => <LoadingPage />,
        Success: () => <MyEditor />,
        Failure: () => <div>서버에 문제가 생겼습니다.</div>
      })}
    </>
  );
}
