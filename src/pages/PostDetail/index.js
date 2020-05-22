import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { MyEditor } from "components";
import Helmet from "components/Helmet";
import { actions, selectors } from "data";
import { useEditorState } from "components/MyEditor/hooks";

export default function PostDetailComp({ match }) {
  const dispatch = useDispatch();

  const { postId } = match.params;

  const userSession = useSelector(selectors.user.getUserSession);
  const title = useSelector(selectors.post.getTitle);
  const subTitle = useSelector(selectors.post.getSubTitle);
  const id = userSession?.id;
  const [editorState, setEditorState] = useEditorState(id);

  useEffect(() => {
    dispatch(actions.post.getOnePostDetail(postId));

    return () => {
      dispatch(actions.post.resetOnePost());
      dispatch(actions.editorState.toggleEditorReadOnly(false));
    };
  }, []);

  return (
    <>
      <Helmet title={title} description={subTitle} />
      <MyEditor
        editorState={editorState}
        setEditorState={setEditorState}
        readOnly={true}
        id={id}
      />
    </>
  );
}
