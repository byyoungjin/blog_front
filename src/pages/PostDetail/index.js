import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import { actions, selectors } from "data";

export default function PostDetailComp({ match }) {
  const dispatch = useDispatch();

  const currentPost = useSelector(selectors.post.getCurrentPost);
  const { postId } = match.params;

  const userSession = useSelector(selectors.user.getUserSession);
  const { id } = userSession;

  useEffect(() => {
    if (currentPost === null) {
      dispatch(actions.editorState.toggleEditorReadOnly(true));
      dispatch(actions.post.getOnePost(postId));
    }
  }, []);

  return currentPost ? (
    <MyEditor
      editorState={currentPost.editorState}
      setEditorState={() => {}}
      readOnly={true}
      id={id}
    />
  ) : null;
}
