import { CompositeDecorator } from "draft-js";

import Link from "components/MyEditor/Inline/Link";
import HandleSpan from "components/MyEditor/Inline/HandleSpan";
import HashTagSpan from "components/MyEditor/Inline/HashTagSpan";

const HANDLE_REGEX = /@[가-힣\w]+/g;
const HASHTAG_REGEX = /#[가-힣\w\u0590-\u05ff]+/g;

export function handleStrategy(contentBlock, callback, contentState) {
  findWithRegex(HANDLE_REGEX, contentBlock, callback);
}

export function hashtagStrategy(contentBlock, callback, contentState) {
  findWithRegex(HASHTAG_REGEX, contentBlock, callback);
}

export function findLinkEntites(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}

function findWithRegex(regex, contentBlock, callback) {
  const text = contentBlock.getText();
  let matchArr, start;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    callback(start, start + matchArr[0].length);
  }
}

export const decorators = [
  { strategy: handleStrategy, component: HandleSpan },
  { strategy: hashtagStrategy, component: HashTagSpan },
  { strategy: findLinkEntites, component: Link }
];

export const compositeDecorator = new CompositeDecorator(decorators);
