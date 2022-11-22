import React from "react";

export default function Head({ title, keywords }) {
  return (
    <head>
      <meta charset="UTF-8" />
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
    </head>
  );
}
