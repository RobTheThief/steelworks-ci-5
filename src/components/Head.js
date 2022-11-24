import React from "react";

export default function Head({ title, keywords }) {
  return (
    <head>
      <meta charSet="UTF-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
    </head>
  );
}
