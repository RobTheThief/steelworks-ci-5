import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="w-full min-h-screen flex justify-center items-center login-register-page overflow-y-scroll">
      {isRegister ? (
        <Register setIsRegister={setIsRegister} />
      ) : (
        <Login setIsRegister={setIsRegister} />
      )}
    </div>
  );
}
