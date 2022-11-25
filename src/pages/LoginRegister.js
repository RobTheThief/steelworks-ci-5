import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Helmet } from "react-helmet-async";
import { css } from "@emotion/css";

function Modal({ showModal, setShowModal, message, heading }) {
  () => (document.getElementById("id01").style.display = "block");
  return (
    <div
      id="id01"
      className={`p-96 fixed left-0 top-0 w-full h-full overflow-auto  ${
        showModal ? "block" : "hidden"
      } ${css`
        background-color: rgb(0, 0, 0);
        background-color: rgba(0, 0, 0, 0.4);
      `}`}
      onClick={() => setShowModal(false)}
    >
      <div className="w3-modal-content">
        <div className="w3-container">
          <span className="w3-button w3-display-topright">&times;</span>
          <h3>{heading}</h3>
          <p>{message}</p>
        </div>
      </div>
    </div>
  );
}

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
        <link
          rel="stylesheet"
          href="https://www.w3schools.com/w3css/4/w3.css"
        ></link>
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
