import React from "react";

import YouTube from "components/MyEditor/Blocks/YouTube";
import SplashSearch from "components/MyEditor/Blocks/SplashSearch";

export default function AtomicInput({ contentState, block }) {
  const entity = contentState.getEntity(block.getEntityAt(0));
  const type = entity.getType();
  let media;
  switch (type) {
    case "youtube":
      media = <YouTube />;
      break;
    case "unsplash":
      media = <SplashSearch />;
      break;
    default:
      return;
  }

  return media;
}
