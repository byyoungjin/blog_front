import React, { useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

import { actions } from "data";

export default function Link(props) {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const [urlLink, setUrlLink] = useState(false);
  console.log("url", url);
  const dispatch = useDispatch();
  return (
    <>
      <A
        href={url}
        // onClick={() => {
        //   dispatch(actions.editorState.toggleEditorReadOnly(true));
        // }}
      >
        {props.children}
      </A>
      {urlLink && <a href={url}> 링크!</a>}
    </>
  );
}

const A = styled.a`
  text-decoration: underline;
  color: blue;
  cursor: pointer;
`;
