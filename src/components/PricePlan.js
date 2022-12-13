import React from "react";
import { css } from "@emotion/css";
import SWButton from "./SWButton";
import { getProfile } from "../apirequests/authRequests";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";

export default function PricePlan({
  type,
  sect1,
  sect2,
  sect3,
  sect4,
  sect5,
  setShowModal,
  setPaymentPlanType,
  setIsCheckOut,
  setModalMessage,
  setModalHeading,
}) {
  const sectStyle = "text-white text-center my-4";

  const handleClick = async () => {
    await getProfile().then((res) => {
      if (res.email) {
        setPaymentPlanType(type);
        setShowModal(true);
      } else {
        setShowModal(true);
        setIsCheckOut(false);
        setModalHeading("Please login or register");
        setModalMessage("You must be logged in to sign up for a subscription.");
      }
    });
  };

  return (
    <>
      <div
        className={`w-1/3 border-slate-500 border-2 rounded-lg p-4 flex flex-col items-center ${css`
          min-width: 182px;
          @media (max-width: 639px) {
            min-width: 295px;
          }
        `}`}
      >
        <div
          className={`relative -top-8 -left-24 ${
            type == "Silver" ? "bg-none" : "bg-black"
          }`}
        >
          {type === "Unlimited" ? (
            <>
              <svg width={0} height={0}>
                <linearGradient id="linearColors" x1={1} y1={0} x2={1} y2={1}>
                  <stop offset={0} stopColor="#fffd30" />
                  <stop offset={0.8} stopColor="#64748b" />
                  <stop offset={1} stopColor="#64748b" />
                </linearGradient>
              </svg>
              <WorkspacePremiumOutlinedIcon
                color="primary"
                fontSize="large"
                className={` ${css`
                  transform: scale(2);
                `}`}
                sx={{ fill: "url(#linearColors)" }}
              />
            </>
          ) : type === "Gold" ? (
            <MilitaryTechIcon
              color="secondary"
              fontSize="large"
              className={` ${css`
                transform: scale(1.5);
                color: yellow !important;
              `}`}
            />
          ) : (
            <MilitaryTechIcon
              fontSize="large"
              className={` ${css`
                 visibility: hidden;
              `}`}
            />
          )}
        </div>
        <h3
          className={`${css`
            color: #0059ff;
          `} text-center text-2xl`}
        >
          <b>{type}</b>
        </h3>
        <p className={sectStyle}>{sect1 && sect1}</p>
        <p className={sectStyle}>{sect2 && sect2}</p>
        <p className={sectStyle}>{sect3 && sect3}</p>
        <p className={sectStyle}>{sect4 && sect4}</p>
        <p className={sectStyle}>{sect5 && sect5}</p>
        <SWButton handleOnClick={handleClick}>Sign up</SWButton>
      </div>
    </>
  );
}
