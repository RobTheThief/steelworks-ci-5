import React from "react";
import { Button } from "@mui/material";
import { css } from "@emotion/css";

export default function SWButton({type, margin, width, children, handleOnClick}) {
  return (
    <Button
      type={type ? type : "button"}
      onClick={handleOnClick && handleOnClick}
      variant="outlined"
      className={`${css`
        width: ${width};
        min-width: 80px !important;
        background-color: rgb(0, 89, 255) !important;
        color: white !important;
        font-weight: 900 !important;
        border-radius: 2rem !important;
        padding: 0.35rem 1.5rem !important;
        margin: ${margin} !important;
      `}`}
    >
     {children}
    </Button>
  );
}
