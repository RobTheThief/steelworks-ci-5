import React from "react";
import { Button } from "@mui/material";
import { css } from "@emotion/css";

export default function Register({ setIsRegister }) {
  const handleClick = () => {
    setIsRegister(false);
  };
  return (
    <div className="register-form">
      <fieldset
        className={css`
          width: 490px;
          margin-top: 4rem;
          padding: 2rem 0;
          border-radius: 5px;
          border: #64748b solid 2px;
          background-color: rgba(0, 0, 0, 0.473);
          display: flex;
          justify-content: center;
          align-items: flex-start;
        `}
      >
        <div className=" w-2/3 h-2/3 flex flex-col">
          <h2 className="text-white mb-8 font-extrabold">Register</h2>
          <label htmlFor="first_name_field" className="text-white">
            First name
          </label>
          <input
            id="first_name_field"
            name="first_name_field"
            type="text"
            className="w-full mb-4 rounded"
            placeholder="First name"
            required
          />
          <label htmlFor="last_name_field" className="text-white">
            Last name
          </label>
          <input
            id="last_name_field"
            name="last_name_field"
            type="text"
            className="w-full mb-4 rounded"
            placeholder="Last name"
            required
          />
          <label htmlFor="email_field" className="text-white">
            Email
          </label>
          <input
            id="email_field"
            name="email_field"
            type="email"
            className="w-full mb-4 rounded"
            placeholder="example@yourmail.com"
            required
          />
          <label htmlFor="username_field" className="text-white">
            Username
          </label>
          <input
            id="username_field"
            name="username_field"
            type="text"
            className="w-full mb-4 rounded"
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
            className="w-full mb-4 rounded"
            required
          />
          <label htmlFor="password_again_field" className="text-white">
            Type password again
          </label>
          <input
            id="password_again_field"
            name="password_again_field"
            type="password"
            className="w-full mb-4 rounded"
            required
          />
          <label htmlFor="address_1_field" className="text-white">
            Address line 1
          </label>
          <input
            id="address_1_field"
            name="address_1_field"
            type="text"
            className="w-full mb-4 rounded"
            required
          />
          <label htmlFor="address_2_field" className="text-white">
            Address line 2
          </label>
          <input
            id="address_2_field"
            name="address_2_field"
            type="text"
            className="w-full mb-4 rounded"
            required
          />
          <label htmlFor="address_3_field" className="text-white">
            Address line 3
          </label>
          <input
            id="address_3_field"
            name="address_3_field"
            type="text"
            className="w-full mb-4 rounded"
            required
          />
          <label htmlFor="postcode_field" className="text-white">
            Postcode
          </label>
          <input
            id="postcode_field"
            name="postcode_field"
            type="text"
            className="w-full mb-4 rounded"
            required
          />
          <label htmlFor="phone_field" className="text-white">
            Phone
          </label>
          <input
            id="phone_field"
            name="phone_field"
            type="tel"
            className="w-full mb-4 rounded"
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
              Login
            </a>
          </div>
        </div>
      </fieldset>
    </div>
  );
}
