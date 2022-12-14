import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Helmet } from "react-helmet-async";
import Modal from "../components/Modal";

export default function LoginRegister({ setProfile }) {
  const [isRegister, setIsRegister] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalHeading, setModalHeading] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        heading={modalHeading}
        message={modalMessage}
      />
      <Helmet>
        <meta charSet="utf-8" />
        <title>Steelworks-login/register</title>
        <link
          rel="canonical"
          href="https://steelworks-fitness.herokuapp.com/"
        />
        <meta
          name="description"
          content="Login and register page for Steelworks Fitness gym web site."
        ></meta>
        <meta
          name="keywords"
          content="Steelworks, Fitness, Gym, login, register, subscription, class, classes"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>
      <div className="w-full min-h-screen flex justify-center items-center login-register-page overflow-y-scroll">
        {isRegister ? (
          <Register
            setIsRegister={setIsRegister}
            setShowModal={setShowModal}
            setModalHeading={setModalHeading}
            setModalMessage={setModalMessage}
            setProfile={setProfile}
          />
        ) : (
          <Login
            setIsRegister={setIsRegister}
            setShowModal={setShowModal}
            setModalHeading={setModalHeading}
            setModalMessage={setModalMessage}
            setProfile={setProfile}
          />
        )}
      </div>
    </>
  );
}
