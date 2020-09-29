import React, { useState } from "react";
import styled from "styled-components";

export default function Link(props) {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  const [urlLink, setUrlLink] = useState(false);
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
