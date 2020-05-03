import { convertFromRaw } from "draft-js";

const rawContent = {
  blocks: [
    {
      text: " ",
      type: "atomic",
      entityRanges: [{ offset: 0, length: 1, key: "first" }]
    },
    {
      text: " ",
      type: "atomic",
      entityRanges: [{ offset: 0, length: 1, key: "second" }]
    },
    {
      text: "",
      type: "unstyled"
    }
  ],

  entityMap: {
    first: {
      type: "postTitle",
      mutability: "IMMUTABLE",
      data: {}
    },
    second: {
      type: "postSubTitle",
      mutability: "IMMUTABLE",
      data: {}
    }
  }
};

export const content = convertFromRaw(rawContent);
