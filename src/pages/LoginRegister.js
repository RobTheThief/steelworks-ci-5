import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Helmet } from "react-helmet-async";
import Modal from '../components/Modal';

export default function LoginRegister() {
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
        <title>Steelworks Fitness</title>
        <link
          rel="canonical"
          href="https://steelworks-fitness.herokuapp.com/"
        />
      </Helmet>
      <div className="w-full min-h-screen flex justify-center items-center login-register-page overflow-y-scroll">
        {isRegister ? (
          <Register
            setIsRegister={setIsRegister}
            setShowModal={setShowModal}
            setModalHeading={setModalHeading}
            setModalMessage={setModalMessage}
          />
        ) : (
          <Login
            setIsRegister={setIsRegister}
            setShowModal={setShowModal}
            setModalHeading={setModalHeading}
            setModalMessage={setModalMessage}
          />
        )}
      </div>
    </>
  );
}
