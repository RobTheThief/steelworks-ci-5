import React from 'react';
import { css } from '@emotion/css';
import { Button } from '@mui/material';

/**
 * Uses MUI to create a side bar/ drawer button as a HashLink component.
 * @param {object} param0
 * @returns
 */
const DrawerButton = ({ label, link, toggleDrawer, HashLink }) => {
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
};

export default DrawerButton;
