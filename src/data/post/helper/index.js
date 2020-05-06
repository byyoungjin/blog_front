import { convertToRaw } from "draft-js";

export const getTitlePhotoFrom = editorState => {
  if (!editorState) return;
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { entityMap } = rawContentState;
  return Object.keys(entityMap).reduce((titlePhotoUrl, key) => {
    const entity = entityMap[key];
    if (titlePhotoUrl === null) {
      if (entity.type === "unsplash") {
        titlePhotoUrl = entity.data.data.regularImageSrc;
      } else if (entity.type === "image") titlePhotoUrl = entity.data.src;
    }
    return titlePhotoUrl;
  }, null);
};
