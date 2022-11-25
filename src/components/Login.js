import React from "react";
import { Button } from "@mui/material";
import { css } from "@emotion/css";

export default function Login({
  setIsRegister,
  setShowModal,
  setModalHeading,
  setModalMessage,
}) {
  const inputClasses = "w-full mb-8 rounded p-1";

  function createModal(heading, message) {
    setShowModal(true);
    setModalHeading(heading);
    setModalMessage(message);
  }

  const handleClick = () => {
    setIsRegister(true);
  };
  
  return (
    <div
      className={`login-form w-1/3 ${css`
        min-width: 295px;
      `}`}
    >
      <fieldset
        className={`my-24 ${css`
          min-width: 295px;
          padding: 2rem;
          border-radius: 5px;
          border: #64748b solid 2px;
          background-color: rgba(0, 0, 0, 0.473);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: flex-start;
        `}`}
      >
        <h2 className="text-white mb-8 font-extrabold">Login</h2>
        <label htmlFor="username_field" className="text-white">
          Username
        </label>
        <input
          id="username_field"
          name="username_field"
          type="text"
          className={inputClasses}
          placeholder="Username"
          required
        />
        <label htmlFor="password_field" className="text-white">
          Password
        </label>
        <input
          id="password_field"
          name="password_field"
          type="password"
          className={inputClasses}
          required
        />
        <div>
          <Button
            type="submit"
            variant="outlined"
            className={css`
              width: 40%;
              background-color: rgb(0, 89, 255) !important;
              color: white !important;
              font-weight: 900 !important;
              border-radius: 2rem !important;
              padding: 0.35rem 1.5rem !important;
            `}
          >
            Submit
          </Button>
          <a
            className="text-blue-300 ml-4 cursor-pointer"
            onClick={handleClick}
          >
            Create account
          </a>
        </div>
      </fieldset>
    </div>
  );
}
