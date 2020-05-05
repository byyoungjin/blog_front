import { convertToRaw } from "draft-js";

export const getTitlePhotoFrom = editorState => {
  if (!editorState) return;
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { entityMap } = rawContentState;
  return Object.keys(entityMap).reduce((titlePhotoUrl, key) => {
    const entity = entityMap[key];
    if (
      (entity.type === "unsplash" || entity.type === "image") &&
      titlePhotoUrl === null
    ) {
      console.log("titlePhotoUrl", titlePhotoUrl);
      titlePhotoUrl = entity.data.data.regularImageSrc;
    }
    return titlePhotoUrl;
  }, null);
};
