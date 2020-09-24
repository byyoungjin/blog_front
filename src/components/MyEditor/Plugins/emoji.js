import createEmojiPlugin from "draft-js-emoji-plugin";
import "draft-js-emoji-plugin/lib/plugin.css";

export const emojiPlugin = createEmojiPlugin({
  priorityList: {
    ":see_no_evil:": ["1f648"],
    ":raised_hands:": ["1f64c"],
    ":100:": ["1f4af"]
  }
});
