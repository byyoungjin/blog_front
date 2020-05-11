import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import Helmet from "components/Helmet";
import { actions, selectors } from "data";

export default function PostDetailComp({ match }) {
  const dispatch = useDispatch();

  const currentPost = useSelector(selectors.post.getCurrentPost);
  const { postId } = match.params;

  const userSession = useSelector(selectors.user.getUserSession);
  const title = useSelector(selectors.post.getTitle);
  const subTitle = useSelector(selectors.post.getSubTitle);
  const id = userSession?.id;

  useEffect(() => {
    dispatch(actions.post.getOnePostDetail(postId));

    return () => {
      dispatch(actions.post.resetOnePost());
      dispatch(actions.editorState.toggleEditorReadOnly(false));
    };
  }, []);

  return currentPost ? (
    <>
      <Helmet title={title} description={subTitle} />
      <MyEditor
        editorState={currentPost.editorState}
        setEditorState={() => {}}
        readOnly={true}
        id={id}
      />
    </>
  ) : null;
}
