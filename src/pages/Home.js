import React, { useState } from "react";
import pullups from "../img/pullups1024.jpg";
import PricePlan from "../components/PricePlan";
import { css } from "@emotion/css";
import { Button } from "@mui/material";
import Modal from "../components/Modal";
import { Helmet } from "react-helmet-async";
import gabbyC from "../img/gabbyc.png";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalHeading, setModalHeading] = useState("");
  const [paymentPlanType, setPaymentPlanType] = useState("");
  const [isCheckout, setIsCheckOut] = useState(true);

  const classes = "hidden";
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Steelworks</title>
        <link
          rel="canonical"
          href="https://steelworks-fitness.herokuapp.com/"
        />
        <meta
          name="description"
          content="Home page for Steelworks Fitness gym web site."
        ></meta>
        <meta
          name="keywords"
          content="Steelworks, Fitness, Gym, subscription, class, classes, plans, about, contact"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>
      <section className="hero-container" id="hero">
        <div className="mt-16">
          <h2 className="absolute w-full h-full top-0 left-0 text-center px-4 py-64 text-2xl lg:text-6xl md:text-4xl sm:text-3xl text-blue-500">
            Forge your dream body
            <br /> at <b>Steelworks</b>
          </h2>
        </div>
      </section>
      <section
        className="about-section mb-52 flex flex-col items-center justify-center"
        id="about"
      >
        <h2
          className={`lg:text-6xl md:text-4xl sm:text-3xl text-3xl w-1/2 mb-12 mt-64 ${css`
            min-width: 260px;
          `}`}
        >
          <b>About</b>
          <br />
          Steelworks Fitness
        </h2>
        <p
          className={`w-1/2 m-2 text-lg sm:text-xl ${css`
            min-width: 260px;
          `}`}
        >
          There is no limit to what you are capable of, physically and mentally.
          All trainers certified through nationally accredited organizations.
          Years of pushing our limits in performance have given us an intutitive
          understanding of what it takes to get to a high level of athleticism
          and strength, which we share with our clients.
          <br />
        </p>
        <div
          className={`w-1/2 m-2 text-lg sm:text-xl mt-8 ${css`
            min-width: 260px;
          `}`}
        >
          <p>
            "I joined Steelworks gym a few months back on friend's
            recommendation and I am so happy of my choice as this is the place
            that I was looking for. Different from the other gyms that I joined
            in the past which I left because of demotivation, Steelworks gym is
            based on classes and this option is fantastic for everybody who does
            not like individual workouts and wishes to have good time while
            getting fit. Besides, at Steelworks gym the trainers really care
            about the gym members and they are willing to help them whenever
            they have a questions. But what makes Steelworks gym a fantastic
            place is the atmosphere, everybody is very nice and welcome. I would
            recommend Steelworks gym to everybody who would like to get results
            and have fun at the same time."
          </p>
          <div className="flex xl:flex-row lg:flex-row xl:items-end lg:items-end sm:flex-col flex-col items-center mt-8">
            <img
              className="inline w-48 ml-4 rounded-full border-2 border-blue-500"
              src={gabbyC}
              alt="Avatar of Gabby C."
            />
            <span className="mb-4 "> - Gabby C.</span>
          </div>
        </div>
      </section>
      <section id="price-plans" className="price-plan-section">
        <div className="border-slate-500 border-y-2 flex flex-col justify-center items-center bg-black p-8 py-32 w-full">
          <h2 className="lg:text-6xl md:text-4xl sm:text-4xl mb-4 text-4xl text-blue-500">
            Price Plans
          </h2>
          <div className="w-1/3 flex flex-col items-center justify-center lg:flex-row gap-4 mt-8">
            <Modal
              showModal={showModal}
              setShowModal={setShowModal}
              isCheckout={isCheckout}
              paymentPlanType={paymentPlanType}
              message={modalMessage}
              heading={modalHeading}
            />
            <PricePlan
              type="Unlimited"
              setShowModal={setShowModal}
              setPaymentPlanType={setPaymentPlanType}
              setIsCheckOut={setIsCheckOut}
              setModalMessage={setModalMessage}
              setModalHeading={setModalHeading}
            />
            <PricePlan
              type="Gold"
              setShowModal={setShowModal}
              setPaymentPlanType={setPaymentPlanType}
              setIsCheckOut={setIsCheckOut}
              setModalMessage={setModalMessage}
              setModalHeading={setModalHeading}
            />
            <PricePlan
              type="Silver"
              setShowModal={setShowModal}
              setPaymentPlanType={setPaymentPlanType}
              setIsCheckOut={setIsCheckOut}
              setModalMessage={setModalMessage}
              setModalHeading={setModalHeading}
            />
          </div>
        </div>
      </section>
      <section
        id="contact_section"
        className="contact-section"
        aria-labelledby="contact_section_heading"
      >
        <h2 id="contact_section_heading" className="hidden">
          Contact
        </h2>
        <div className="w-full h-full flex flex-col justify-center items-center mt-8 ">
          <fieldset
            className={css`
              width: 33%;
              min-width: 295px;
              border-radius: 5px;
              border: #64748b solid 2px;
              background-color: rgba(0, 0, 0, 0.473);
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
            `}
          >
            <form
              action="https://formspree.io/f/xqkjjegb"
              className="w-4/5 h-3/5 flex flex-col z-50 pt-0 pb-0"
              method="POST"
              target="_blank"
            >
              <span className="text-white w-full my-4 text-2xl">Contact</span>
              <label htmlFor="email_field" className="text-white mb-1">
                Email
              </label>
              <input
                id="email_field"
                name="email_field"
                type="email"
                className="w-full mb-4 rounded p-1"
                placeholder="example@yourmail.com"
                required
              />

              <label htmlFor="message_field" className="text-white mb-1">
                Message
              </label>
              <textarea
                id="message_field"
                name="message_field"
                className={`mb-4 rounded p-1 ${css`
                  height: 300px;
                `}`}
                placeholder="Please type your message here"
                required
              ></textarea>
              <Button
                type="submit"
                variant="outlined"
                className={css`
                  width: 40%;
                  background-color: rgb(0, 89, 255) !important;
                  color: white !important;
                  font-weight: 900 !important;
                  border-radius: 2rem !important;
                  padding: 0.35rem 1.5rem !important;
                `}
              >
                Submit
              </Button>
            </form>
            <div className="flex lg:flex-row md:flex-col sm:flex-col flex-col w-4/5 text-white font-extrabold text-xl mb-4">
              <div className="mt-4 w-full">
                <span className="mt-4 w-full">Address:</span>
                <address className="mt-4 w-full">
                  9 Moss Lane
                  <br />
                  Riverway
                  <br />
                  South Douglas Road
                  <br />
                  Cork
                  <br />
                  T12 K5FW
                </address>
              </div>
              <div className="mt-4 w-full">
                <span className=" mt-4 w-full">Tel:</span>
                <br />
                <p>+00353 021 1234567</p>
              </div>
            </div>
          </fieldset>
        </div>
      </section>
    </>
  );
}

export default Home;
