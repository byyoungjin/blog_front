import { convertFromRaw } from "draft-js";

const rawContent = {
  blocks: [
    {
      key: "first",
      text: "",
      type: "title",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "second",
      text: "",
      type: "subTitle",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    },
    {
      key: "third",
      text: "",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {}
    }
  ],
  entityMap: {}
};

export const content = convertFromRaw(rawContent);
