import React from 'react';
import { Button } from '@mui/material';
import { css } from '@emotion/css';

/**
 * Wraps MUI Button component to style the steelworks
 * button. Can be user as a link, submission button,
 * or to run a function.
 * @param {object} param0
 * @returns jsx
 */
const SWButton = ({
  type,
  margin,
  width,
  children,
  handleOnClick,
  component,
  link
}) => {
  return (
    <Button
      type={type ? type : 'button'}
      onClick={handleOnClick && handleOnClick}
      variant='outlined'
      component={component && component}
      to={link && link}
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
};

export default SWButton;
