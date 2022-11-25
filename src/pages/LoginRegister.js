import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";
import { Helmet } from "react-helmet-async";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Steelworks Fitness</title>
        <link rel="canonical" href="https://steelworks-fitness.herokuapp.com/" />
      </Helmet>
      <div className="w-full min-h-screen flex justify-center items-center login-register-page overflow-y-scroll">
        {isRegister ? (
          <Register setIsRegister={setIsRegister} />
        ) : (
          <Login setIsRegister={setIsRegister} />
        )}
      </div>
    </div>
  );
}
