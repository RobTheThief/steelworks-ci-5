import React, { useEffect, useState } from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { css } from "@emotion/css";
import SWButton from "./SWButton";

import CheckoutForm from "./CheckoutForm";
import { getProfile } from "../apirequests/authRequests";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import { getSWUser } from "../apirequests/apiBackEndRequests";

const stripePromise = loadStripe(process.env.REACT_STRIPE_PUBLISHABLE_KEY);

export default function Modal({
  showModal,
  setShowModal,
  message,
  heading,
  isInput,
  setter,
  func,
  isCheckout,
  paymentPlanType,
  setResponseMessage,
}) {
  const [userEmail, setUserEmail] = useState("");
  const [swUser, setSWUser] = useState("");

  const getProfileAsync = async () => {
    await getProfile().then((res) => setUserEmail(res.email)).then(() => {
      getUserAsync()
    });
  };

  async function getUserAsync() {
    try {
      if (userEmail) {
        await getSWUser(userEmail)
          .then((res) => res.json())
          .then((res) => {
            setSWUser(res);
          });
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    isCheckout && getProfileAsync();
    console.log(isCheckout, isInput);
  }, [paymentPlanType]);

  return (
    <div
      id="id01"
      className={`p-96 fixed left-0 top-0 w-full h-full overflow-auto flex justify-center items-center ${
        showModal ? "block" : "hidden"
      } ${css`
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
        z-index: 10000;
      `}`}
      onClick={() => {
        !isInput && !isCheckout && setShowModal(false);
        setResponseMessage && setResponseMessage("");
      }}
    >
      <div
        className={`${isCheckout ? "w-2/3" : "w-1/3"} ${
          isCheckout ? "bg-white text-black" : "bg-black text-white"
        } rounded border-blue-500 border-2`}
      >
        <div className="px-4 pt-2 pb-8">
          <div className="flex  justify-end">
            <h3 className="w-full text-lg text-blue-500">{heading}</h3>
            <span
              onClick={() => {
                (isInput || isCheckout) && setShowModal(false);
                setResponseMessage && setResponseMessage("");
              }}
              className="realtive top-0 left-0 cursor-pointer text-3xl"
            >
              &times;
            </span>
          </div>
          {isInput ? (
            <div className="flex flex-col">
              {setter ? (
                <input
                  type="password"
                  className="text-black mt-2 rounded"
                  onChange={(e) => setter(e.target.value)}
                ></input>
              ) : (
                <p className="w-full">{message}</p>
              )}
              <div className="flex w-full justify-center mt-4">
                <div className="w-1/2 flex justify-between">
                  <SWButton
                    handleOnClick={() => {
                      setShowModal(false);
                      setResponseMessage && setResponseMessage("");
                      func && func();
                    }}
                    variant="outlined"
                    width="15%"
                  >
                    Ok
                  </SWButton>
                  <SWButton
                    variant="outlined"
                    width="15%"
                    handleOnClick={() => {
                      setShowModal(false);
                      setResponseMessage && setResponseMessage("");
                    }}
                  >
                    Cancel
                  </SWButton>
                </div>
              </div>
            </div>
          ) : isCheckout ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm
                paymentPlanType={paymentPlanType}
                userEmail={userEmail}
                userID={swUser?.id}
              />
            </Elements>
          ) : (
            <div className="flex items-center">
              <WarningAmberIcon
                className="pr-2 text-yellow-500"
                fontSize="large"
              />
              <p className="w-full">{message}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
