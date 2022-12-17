import React, { useCallback, useState } from "react";
import { Button } from "@mui/material";
import { css } from "@emotion/css";
import { getProfile, login, register } from "../apirequests/authRequests";
import { createUser } from "../apirequests/apiBackEndRequests";
import { useNavigate } from "react-router-dom";

export default function Register({
  setIsRegister,
  setShowModal,
  setModalHeading,
  setModalMessage,
  setProfile,
}) {
  const [user, setUser] = useState();
  const [pass, setPass] = useState();
  const [pass2, setPass2] = useState();
  const [email, setEmail] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [postCode, setPostCode] = useState();
  const [phone, setPhone] = useState();
  const address1 = "address line 1";
  const address2 = "address line 2";
  const address3 = "address line 3";

  const navigate = useNavigate();

  const inputClasses = "w-full mb-8 rounded p-1";

  const handleNavigateAccount = useCallback(
    () => navigate("/user-account", { replace: true }),
    [navigate]
  );

  const handleGoToLogin = () => {
    setIsRegister(false);
  };

  function createModal(heading, message) {
    setShowModal(true);
    setModalHeading(heading);
    setModalMessage(message);
  }

  const handleRegister = async () => {
    const result = await register(
      user,
      pass,
      pass2,
      email,
      firstName,
      lastName
    );
    if (result.email && result.email[0] !== "This field must be unique.") {
      createUser(
        email,
        firstName,
        lastName,
        address1,
        address2,
        address3,
        postCode,
        phone
      );
      await login(user, pass);
      const profile = await getProfile();
      setProfile(profile);
      handleNavigateAccount();
    } else if (result.email) {
      createModal("Input error!", "Email already used. " + result.email[0]);
    } else {
      createModal(
        "Input error!",
        result.username ? result.username[0] : result.password[0]
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    user.length <= 14
      ? handleRegister()
      : createModal(
          "Inpur error!",
          "Username can be no longer than 14 characters."
        );
  };

  return (
    <form
      className={`register-form w-full h-full flex flex-col justify-end items-center`}
      onSubmit={(e) => handleSubmit(e)}
    >
      <fieldset
        className={`my-24 w-1/3 rounded flex justify-center items-start p-6 ${css`
          min-width: 295px;
          max-width: 400px;
          border: #64748b solid 2px;
          background-color: rgba(0, 0, 0, 0.473);
        `}`}
      >
        <div className="w-full h-2/3 flex flex-col">
          <h2 className="text-white text-xl mb-8 font-extrabold">Register</h2>
          <label htmlFor="first_name_field" className="text-white">
            First name
          </label>
          <input
            id="first_name_field"
            name="first_name_field"
            type="text"
            className={inputClasses}
            placeholder="First name"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label htmlFor="last_name_field" className="text-white">
            Last name
          </label>
          <input
            id="last_name_field"
            name="last_name_field"
            type="text"
            className={inputClasses}
            placeholder="Last name"
            required
            onChange={(e) => setLastName(e.target.value)}
          />
          <label htmlFor="email_field" className="text-white">
            Email
          </label>
          <input
            id="email_field"
            name="email_field"
            type="email"
            className={inputClasses}
            placeholder=" example@yourmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
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
            onChange={(e) => setUser(e.target.value)}
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
            onChange={(e) => setPass(e.target.value)}
          />
          <label htmlFor="password_again_field" className="text-white">
            Type password again
          </label>
          <input
            id="password_again_field"
            name="password_again_field"
            type="password"
            className={inputClasses}
            required
            onChange={(e) => setPass2(e.target.value)}
          />
          <label htmlFor="postcode_field" className="text-white">
            Postcode
          </label>
          <input
            id="postcode_field"
            name="postcode_field"
            type="text"
            className={inputClasses}
            required
            onChange={(e) => setPostCode(e.target.value)}
          />
          <label htmlFor="phone_field" className="text-white">
            Phone
          </label>
          <input
            id="phone_field"
            name="phone_field"
            type="tel"
            pattern="(^\d{1,10}$)"
            className={inputClasses}
            required
            onChange={(e) => setPhone(e.target.value)}
          />
          <div
            className={`pb-4 flex ${css`
              @media (max-width: 1226px) {
                flex-direction: column;
              }
            `}`}
          >
            <Button
              type="submit"
              variant="outlined"
              className={css`
                width: 40%;
                min-width: 80px !important;
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
              className={`text-blue-300 ml-4 block cursor-pointer min-w-32 ${css`
                min-width: 154px;
                @media (max-width: 1226px) {
                  margin: 0.5rem 0 0 0.125rem;
                }
              `}`}
              onClick={handleGoToLogin}
            >
              Have an account already? Go to login
            </a>
          </div>
        </div>
      </fieldset>
    </form>
  );
}
