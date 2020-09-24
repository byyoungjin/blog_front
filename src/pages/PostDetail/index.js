import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import Helmet from "components/Helmet";
import { actions, selectors } from "data";

export default function PostDetailComp({ match }) {
  const dispatch = useDispatch();

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
  }, []);

  return (
    <>
      <Helmet title={title} description={subTitle} />
      <MyEditor readOnly={true} />
    </>
  );
}
