import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import { actions, selectors } from "data";
import { useEditorState } from "components/MyEditor/hooks";

export default function PostEditComp({ match }) {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useEditorState();

  const userSession = useSelector(selectors.user.getUserSession);
  const { id } = userSession;

  useEffect(() => {
    dispatch(actions.editorState.toggleEditorReadOnly(false));
    dispatch(actions.editorState.setEditorType("edit"));
    // dispatch(actions.post.getOnePost(postId));
  }, []);

  return (
    <MyEditor
      editorState={editorState}
      setEditorState={setEditorState}
      readOnly={false}
      id={id}
    />
  );
}
