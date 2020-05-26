import { convertToRaw } from "draft-js";

import api from "api";

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

export const uploadTagsToDB = async ({ editorState, postId }) => {
  // insert tag information to database
  const tagsArray = getTagsFrom(editorState);

  const res = await api.tagApi.getTagsOfPostId({ postId });
  const { tags: tagsDatabase } = res.data;

  await tagsDatabase.forEach(async tagDatabase => {
    const tagIdDatabase = tagDatabase.id;
    const tagNameDatabase = tagDatabase.tagName;
    const isInNowTags = tagsArray.find(
      tagNowName => tagNowName === tagNameDatabase
    );

    if (!isInNowTags) {
      await api.postTagApi.deleteMaping({
        tagId: tagIdDatabase,
        postId
      });
    }
  });

  if (tagsArray.length !== 0) {
    await tagsArray.forEach(async tagName => {
      let tagIdToMap;
      // const isInTagsRes = await api.tagApi.isInTags({ tagName });
      // const { tagId } = isInTagsRes.data;
      // tagIdToMap = tagId;
      // if (!tagId) {
      const res = await api.tagApi.createTag({ tagName });
      const { tagId } = res.data;
      tagIdToMap = tagId;
      // }

      await api.postTagApi.mapPostTag({
        PostId: postId,
        TagId: tagIdToMap
      });
    });
  }
};
