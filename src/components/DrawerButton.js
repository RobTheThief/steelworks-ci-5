import React from "react";
import { css } from "@emotion/css";
import { Button } from "@mui/material";

export default function DrawerButton({ label, link, toggleDrawer, HashLink }) {
  return (
    <Button
      onClick={toggleDrawer(false)}
      component={HashLink}
      smooth
      to={link}
      className={css`
        justify-content: start !important;
        font-size: 20px !important;
      `}
    >
      {label}
    </Button>
  );
}
