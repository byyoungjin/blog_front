import { convertToRaw } from "draft-js";

const HASHTAG_REGEX = /#[가-힣\w\u0590-\u05ff]+/g;

export const getTitlePhotoFrom = editorState => {
  if (!editorState) return;
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { entityMap } = rawContentState;
  return Object.keys(entityMap).reduce((titlePhotoUrl, key) => {
    const entity = entityMap[key];
    if (titlePhotoUrl === null) {
      if (entity.type === "unsplash") {
        titlePhotoUrl = entity.data.src.regularImageSrc;
      } else if (entity.type === "image") titlePhotoUrl = entity.data.src;
    }
    return titlePhotoUrl;
  }, null);
};

export const getPostInfoFrom = editorState => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { blocks } = rawContentState;
  return blocks.reduce(
    ({ title, subTitle }, block) => {
      if (title === null && block.type === "title") {
        title = block.text;
      }

      if (subTitle === null && block.type === "subTitle") {
        subTitle = block.text;
      }

      return { title, subTitle };
    },
    { title: null, subTitle: null }
  );
};

export const getTagsFrom = editorState => {
  const contentState = editorState.getCurrentContent();
  const rawContentState = convertToRaw(contentState);
  const { blocks } = rawContentState;
  return blocks.reduce((tags, block) => {
    const text = block.text;
    let matchArr;
    while ((matchArr = HASHTAG_REGEX.exec(text)) !== null) {
      const matchString = matchArr[0];
      const sameIndex = tags.findIndex(tag => tag === matchString);

      if (sameIndex === -1) tags.push(matchString);
    }
    return tags;
  }, []);
};
