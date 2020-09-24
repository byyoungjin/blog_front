import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { MyEditor } from "components";
import { actions } from "data";

export default function PostEditComp({ match }) {
  const dispatch = useDispatch();

  const { postId } = match.params;
  useEffect(() => {
    dispatch(actions.post.getOnePostEdit(postId));
    return () => {
      dispatch(actions.editorState.resetEditorState());
    };
  }, [dispatch, postId]);

  return <MyEditor readOnly={false} />;
}
