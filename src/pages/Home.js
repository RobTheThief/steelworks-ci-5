import { Button } from "@mui/material";
import React from "react";
import pullups from "../img/pullups1024.jpg";
import { css } from "@emotion/css";

function PricePlan({
  type,
  headingClasses,
  sect1,
  sect2,
  sect3,
  sect4,
  sect5,
}) {
  const sectStyle = "text-white text-center my-4";
  return (
    <div className="w-1/3 border-slate-500 border-2 rounded-lg p-4 flex flex-col items-center">
      <h3 className={`${headingClasses} text-center`}>
        <b>{type}</b>
      </h3>
      <p className={sectStyle}>{sect1 && sect1}</p>
      <p className={sectStyle}>{sect2 && sect2}</p>
      <p className={sectStyle}>{sect3 && sect3}</p>
      <p className={sectStyle}>{sect4 && sect4}</p>
      <p className={sectStyle}>{sect5 && sect5}</p>
      <Button
        className={css`
          width: 35%;
          background-color: rgb(0, 89, 255) !important;
          color: white !important;
          font-weight: 900 !important;
          border-radius: 2rem !important;
        `}
      >
        Sign up
      </Button>
    </div>
  );
}

function Home(props) {
  return (
    <>
      <section className="hero-container">
        <div className="mt-16">
          <h2 className="absolute w-full h-full top-0 left-0 text-center m-auto pb-64 lg:text-6xl md:text-4xl sm:text-2xl pt-32 md:pt-64 sm:pt-32 text-blue-500">
            Forge your dream body
            <br /> at <b>Steelworks</b>
          </h2>
        </div>
      </section>
      <section className="m-52">
        <h2 className="lg:text-6xl md:text-4xl sm:text-2xl w-1/2 m-auto mb-12">
          <b>About</b>
          <br />
          Steelworks Fitness
        </h2>
        <p className="w-1/2 m-auto text-xl">
          "There is no limit to what you are capable of, physically and
          mentally. All trainers certified through nationally accredited
          organizations. Years of pushing our limits in performance have given
          us an intutitive understanding of what it takes to get to a high level
          os athleticism and strength, which we share with our clients."
        </p>
      </section>
      <img
        className="w-full"
        src={pullups}
        alt="Man hanging from a bar, doing pullups"
      />
      <section className="">
        <div className="border-slate-500 border-y-2 flex flex-col justify-center items-center bg-black p-8 w-full">
          <h2 className="lg:text-6xl md:text-4xl sm:text-2xl text-blue-500">
            Price Plans
          </h2>
          <div className="w-1/2 flex flex-row gap-2 mt-8">
            <PricePlan
              type="Unlimited"
              headingClasses="text-blue-500"
              sect1="30 days of Unlimited classes at Gold price"
              sect2="8 classes a month after 1st 30 days"
              sect3="Childwatch"
              sect4="Shower access, locker access, and more"
              sect5="Cancel or change plan w/ email or text 48hr notice"
            />
            <PricePlan
              type="Gold"
              headingClasses="text-yellow-500"
              sect1="30 days of Unlimited classes at Gold price"
              sect2="8 classes a month after 1st 30 days"
              sect3="Childwatch"
              sect4="Shower access, locker access, and more"
              sect5="Cancel or change plan w/ email or text 48hr notice"
            />
            <PricePlan
              type="Silver"
              headingClasses="text-slate-500"
              sect1="30 days of Unlimited classes at Gold price"
              sect2="8 classes a month after 1st 30 days"
              sect3="Childwatch"
              sect4="Shower access, locker access, and more"
              sect5="Cancel or change plan w/ email or text 48hr notice"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
