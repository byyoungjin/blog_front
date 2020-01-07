import React, { useCallback, useMemo } from "react";
import Editor from "draft-js-plugins-editor";
import createImagePlugin from "draft-js-image-plugin";

const imagePlugin = createImagePlugin();

export default function PlugInsEditor({ editorState, onChange, ...rest }) {
  // imagePlugin 이 아래 코드들을 대체한다.

  // const mediaBlockRenderer = block => {
  //   if (block.getType() === "atomic") {
  //     return {
  //       component: Media,
  //       editable: false
  //     };
  //   }
  //   return null;
  // };

  // const Image = ({ src }) => {
  //   return <img src={src} alt={"upload"} />;
  // };

  // const Media = ({ block }) => {
  //   const contentState = editorState.getCurrentContent();
  //   const entity = contentState.getEntity(block.getEntityAt(0));

  //   const { src } = entity.getData();
  //   const type = entity.getType();

  //   let media;
  //   if (type === "image") {
  //     media = <Image src={src} />;
  //   }

  //   return media;
  // };

  console.log("rendered");
  return (
    <Editor
      editorState={editorState}
      onChange={onChange}
      {...rest}
      plugins={[imagePlugin]}
    />
  );
}
