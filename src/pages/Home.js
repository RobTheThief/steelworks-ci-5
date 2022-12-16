import React, { useState } from "react";
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
          content="Steelworks, Fitness, Gym, subscription, class, classes, plans, about, contact, zumba, crossfit, hiit, spin"
        ></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Helmet>
      <section
        className={`hero-container ${css`
          box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px,
            rgba(0, 0, 0, 0.22) 0px 15px 12px;
        `}`}
        id="hero"
      >
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
          className={`lg:text-6xl md:text-4xl sm:text-3xl text-3xl mb-12 mt-16 lg:mt-64 md:mt-48 sm:mt-16 ${css`
            width: 45%;
            min-width: 822px;
            max-width: 822px;
            @media (max-width: 700px) {
              width: 70%;
            }
            @media (max-width: 1024px) {
              min-width: 0;
            }
          `}`}
        >
          <b>About</b>
          <br />
          Steelworks Fitness
        </h2>
        <p
          className={`m-2 text-lg sm:text-xl ${css`
            width: 45%;
            min-width: 822px;
            max-width: 822px;
            @media (max-width: 700px) {
              width: 70%;
            }
            @media (max-width: 1024px) {
              min-width: 0;
            }
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
          className={`m-2 text-lg sm:text-xl mt-8 ${css`
            width: 45%;
            min-width: 822px;
            max-width: 822px;
            @media (max-width: 700px) {
              width: 70%;
            }
            @media (max-width: 1024px) {
              min-width: 0;
            }
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
          <div className="flex flex-col xl:flex-row lg:flex-row sm:flex-col xl:items-end lg:items-end  items-center mt-16">
            <img
              className="inline w-48 lg:ml-4 rounded-full border-2 border-blue-500"
              src={gabbyC}
              alt="Avatar of Gabby C."
            />
            <span className="mb-4 "> - Gabby C.</span>
          </div>
        </div>
      </section>
      <section id="price-plans" className="price-plan-section">
        <div
          className={`border-slate-500 border-y-2 flex flex-col justify-center items-center bg-black p-8 py-32 w-full ${css`
            box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
              rgba(0, 0, 0, 0.12) 0px -12px 30px,
              rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
              rgba(0, 0, 0, 0.09) 0px -3px 5px;
          `}`}
        >
          <h2 className="lg:text-6xl md:text-4xl sm:text-4xl mb-4 text-4xl text-blue-500">
            Price Plans
          </h2>
          <div
            className={`w-1/3 flex flex-col items-center justify-center lg:flex-row gap-4 mt-8 ${css`
              max-width: 691px;
            `}`}
          >
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
        className="contact-section py-96"
        aria-labelledby="contact_section_heading"
      >
        <h2 id="contact_section_heading" className="hidden">
          Contact
        </h2>
        <div className="w-full h-full flex flex-col justify-center items-center">
          <fieldset
            className={`rounded flex flex-col justify-center items-center py-4 ${css`
              min-width: 822px;
              border: #64748b solid 2px;
              background-color: rgba(0, 0, 0, 0.473);
              @media (max-width: 1024px) {
                min-width: 0;
                width: 65%;
              }
              @media (max-width: 700px) {
                width: 95%;
              }
            `}`}
          >
            <form
              action="https://formspree.io/f/xqkjjegb"
              className="w-11/12 flex flex-col z-50 pt-0 pb-0"
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
                className={`w-full mb-4 rounded p-1 border-2 border-blue-500 text-white ${css`
                  background-color: rgba(0, 0, 0, 0.473);
                `}`}
                placeholder="example@yourmail.com"
                required
              />

              <label htmlFor="message_field" className="text-white mb-1">
                Message
              </label>
              <textarea
                id="message_field"
                name="message_field"
                className={`mb-4 rounded p-1 text-white border-2 border-blue-500 ${css`
                  height: 200px;
                  background-color: rgba(0, 0, 0, 0.473);
                  @media (max-width: 1024px) {
                    height: 170px;
                  }
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
              <div className="mt-12 w-full">
                <span className="mt-4 w-full">Address:</span>
                <address className="mt-4 w-full">
                  25 Boss Lane
                  <br />
                  Riverway
                  <br />
                  South Douglas Road
                  <br />
                  Cork
                  <br />
                  T12 K5TP
                </address>
              </div>
              <div className="mt-12 w-full">
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
