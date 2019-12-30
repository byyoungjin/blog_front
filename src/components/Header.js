import React from "react";
import image from "components/coverImage.JPG";

export default function Header() {
  return (
    <div>
      <div
        style={{
          width: "100%",
          height: "100vh",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      ></div>
    </div>
  );
}
