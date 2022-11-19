import React from "react";
import { css } from "@emotion/css";
import { Button } from "@mui/material";

export default function PricePlan({
  type,
  headingClasses,
  sect1,
  sect2,
  sect3,
  sect4,
  sect5,
}) {
  const sectStyle = "text-white text-center my-4";
  return (
    <div className="w-1/3 border-slate-500 border-2 rounded-lg p-4 flex flex-col items-center">
      <h3 className={`${headingClasses} text-center`}>
        <b>{type}</b>
      </h3>
      <p className={sectStyle}>{sect1 && sect1}</p>
      <p className={sectStyle}>{sect2 && sect2}</p>
      <p className={sectStyle}>{sect3 && sect3}</p>
      <p className={sectStyle}>{sect4 && sect4}</p>
      <p className={sectStyle}>{sect5 && sect5}</p>
      <Button
        className={css`
          width: 35%;
          background-color: rgb(0, 89, 255) !important;
          color: white !important;
          font-weight: 900 !important;
          border-radius: 2rem !important;
        `}
      >
        Sign up
      </Button>
    </div>
  );
}
