import createBlockBreakeoutPlugin from "draft-js-block-breakout-plugin";

const options = {
  breakoutBlocktype: "unstyled",
  breakoutBlocks: [
    "header-one",
    "header-two",
    "header-three",
    "header-four",
    "header-five",
    "header-six",
    "title",
    "subTitle"
  ],
  doubleBreakoutBlocks: [
    "blockquote",
    "unordered-list-item",
    "ordered-list-item",
    "code-block"
  ]
};
export const blockBreakoutPlugin = createBlockBreakeoutPlugin(options);
