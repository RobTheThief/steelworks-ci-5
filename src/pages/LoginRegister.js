import React, { useState } from "react";
import Register from "../components/Register";


export default function LoginRegister() {
    const [isRegister, setIsRegister] = useState(false);
    const [isLogin, setIsLogin] = useState(false);
  return (
    <div className="w-full h-full flex justify-center items-center login-register-page">
      {isRegister ? <Register /> : null}
      {/* {isLogin ? <Login /> : null} */}
    </div>
  );
}
