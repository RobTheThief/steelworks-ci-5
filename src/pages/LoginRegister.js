import React, { useState } from "react";
import Head from "../components/Head";
import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(true);
  return (
    <>
      <Head
        title="Login/Register"
        keywords="login, register, steelworks fitness, steelworks, fitness, gym"
      />
      <div className="w-full min-h-screen flex justify-center items-center login-register-page overflow-y-scroll">
        {isRegister ? (
          <Register setIsRegister={setIsRegister} />
        ) : (
          <Login setIsRegister={setIsRegister} />
        )}
      </div>
    </>
  );
}
