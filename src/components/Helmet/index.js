import React from "react";
import { Helmet } from "react-helmet";

export default function HelmetComp({ title, description, type, imageUrl }) {
  const currentUrl = window.location.href;
  return (
    <Helmet>
      <meta charSet="utf-8" />
      <title>{title}</title>

      {/* <!-- Primary Meta Tags --> */}

      <meta name="title" content={title} />
      <meta name="description" content={description} />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      <meta property="og:site_name" content="LOG" />

      {/* <!-- Twitter --> */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl}></meta>
    </Helmet>
  );
}
