import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import { css } from "@emotion/css";

export default function Modal({ showModal, setShowModal, message, heading }) {
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
      onClick={() => setShowModal(false)}
    >
      <div className="w-1/3 bg-black text-white rounded border-blue-500 border-2">
        <div className="px-4 pt-2 pb-8">
          <div className="flex  justify-end">
            <h3 className="w-full text-lg text-blue-500">{heading}</h3>
            <span className="realtive top-0 left-0">&times;</span>
          </div>
          <div className="flex items-center">
            <WarningAmberIcon className="pr-2 text-yellow-500" fontSize='large'/>
            <p className="w-full">{message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}