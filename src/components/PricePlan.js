import React from "react";
import { css } from "@emotion/css";
import SWButton from "./SWButton";
import { getProfile } from "../apirequests/authRequests";

export default function PricePlan({
  type,
  headingClasses,
  sect1,
  sect2,
  sect3,
  sect4,
  sect5,
  setShowModal,
  setPaymentPlanType,
  setIsCheckOut,
  setModalMessage,
  setModalHeading
}) {
  const sectStyle = "text-white text-center my-4";

  const handleClick = async () => {
    await getProfile().then(res => {
      if (res.email) {
        console.log(res.email)
        setPaymentPlanType(type);
        setShowModal(true);
      } else {
        setShowModal(true);
        setIsCheckOut(false)
        setModalHeading('Please login or register')
        setModalMessage('You must be logged in to sign up for a subscription.')
      }
    })
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
        <h3 className={`${headingClasses} text-center`}>
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
