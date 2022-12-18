import React from "react";
import { HashLink } from "react-router-hash-link";
import error404 from "../img/404.gif";
import SWButton from "../components/SWButton";

/**
 * Renders a 404 error gif and a button to go back home.
 * @returns jsx
 */
const Page404 = () => {
  return (
    <div className=" m-auto flex flex-col justify-center items-center w-screen h-screen font-bold text-blue-500 text-3xl">
      <img src={error404} alt="Error 404 not found" />
      <SWButton component={HashLink} link="/">
        Back to home
      </SWButton>
    </div>
  );
};

export default Page404;
