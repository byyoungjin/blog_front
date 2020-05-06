import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import { actions, selectors } from "data";
import { useEditorState } from "components/MyEditor/hooks";

export default function PostEditComp({ match }) {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useEditorState();
  const { postId } = match.params;

  const userSession = useSelector(selectors.user.getUserSession);
  const { id } = userSession;

  useEffect(() => {
    dispatch(actions.post.getOnePostEdit(postId));
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
