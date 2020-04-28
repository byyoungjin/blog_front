import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import { actions, selectors } from "data";

export default function PostDetailComp({ match }) {
  const dispatch = useDispatch();
  const currentPost = useSelector(selectors.post.getCurrentPost);
  const { postId } = match.params;

  useEffect(() => {
    console.log("currentPost", currentPost);
    if (currentPost === null) {
      dispatch(actions.post.getOnePost(postId));
    }
  }, []);

  return <MyEditor editorState={currentPost?.editorState} readOnly={true} />;
}
