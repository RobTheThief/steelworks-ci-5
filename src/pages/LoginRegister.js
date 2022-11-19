import React, { useState } from "react";
import Login from "../components/Login";
import Register from "../components/Register";

export default function LoginRegister() {
  const [isRegister, setIsRegister] = useState(false);
  return (
    <div className="w-full h-full flex justify-center items-center login-register-page">
      {isRegister ? (
        <Register setIsRegister={setIsRegister} />
      ) : (
        <Login setIsRegister={setIsRegister} />
      )}
    </div>
  );
}
