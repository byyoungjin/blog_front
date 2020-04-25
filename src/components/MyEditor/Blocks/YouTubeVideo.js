import React from "react";

const YouTubeVideo = ({ src }) => {
  const isWatch = src.includes("watch");
  const splitLetter = isWatch ? "=" : "/";
  const newSrc =
    "https://www.youtube.com/embed/" + src.split(splitLetter).reverse()[0];
  return (
    <iframe
      title="title"
      width="560"
      height="315"
      src={newSrc}
      frameBorder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  );
};

export default YouTubeVideo;
