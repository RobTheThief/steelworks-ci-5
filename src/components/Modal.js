import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { css } from "@emotion/css";
import { Button } from "@mui/material";

export default function Modal({
  showModal,
  setShowModal,
  message,
  heading,
  isInput,
  setter,
  func,
}) {
  () => (document.getElementById("id01").style.display = "block");

  return (
    <div
      id="id01"
      className={`p-96 fixed left-0 top-0 w-full h-full overflow-auto flex justify-center items-center ${
        showModal ? "block" : "hidden"
      } ${css`
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
      `}`}
      onClick={() => !isInput && setShowModal(false)}
    >
      <div className="w-1/3 bg-black text-white rounded border-blue-500 border-2">
        <div className="px-4 pt-2 pb-8">
          <div className="flex  justify-end">
            <h3 className="w-full text-lg text-blue-500">{heading}</h3>
            <span
              onClick={() => isInput && setShowModal(false)}
              className="realtive top-0 left-0 cursor-pointer"
            >
              &times;
            </span>
          </div>
          {isInput ? (
            <div className="flex">
              <input
                type="password"
                className="text-black mt-2 rounded"
                onChange={(e) => setter(e.target.value)}
              ></input>{" "}
              <Button
                onClick={() => {
                  setShowModal(false);
                  func();
                }}
                variant="outlined"
                className={`${css`
                  width: 20%;
                  min-width: 80px !important;
                  background-color: rgb(0, 89, 255) !important;
                  color: white !important;
                  font-weight: 900 !important;
                  border-radius: 2rem !important;
                  padding: 0.35rem 1.5rem !important;
                  margin: 0.5rem 0 0 1rem !important;
                `}`}
              >
                Ok
              </Button>
            </div>
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
