import React, { useState } from "react";
import pullups from "../img/pullups1024.jpg";
import PricePlan from "../components/PricePlan";
import { css } from "@emotion/css";
import { Button } from "@mui/material";
import Modal from "../components/Modal";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeading, setModalHeading] = useState('');
  const [paymentPlanType, setPaymentPlanType] = useState("");
  const [isCheckout, setIsCheckOut] = useState(true);

  const classes = "hidden";
  return (
    <>
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
      <section id="price-plans" className="price-plan-section">
        <div className="border-slate-500 border-y-2 flex flex-col justify-center items-center bg-black p-8 py-32 w-full">
          <h2 className="lg:text-6xl md:text-4xl sm:text-3xl text-3xl text-blue-500">
            Price Plans
          </h2>
          <div className="max-w-2xl flex flex-col items-center sm:flex-row gap-2 mt-8">
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
              headingClasses="text-blue-500"
              sect1="30 days of Unlimited classes at Gold price"
              sect2="8 classes a month after 1st 30 days"
              sect3="Childwatch"
              sect4="Shower access, locker access, and more"
              sect5="Cancel or change plan w/ email or text 48hr notice"
              setShowModal={setShowModal}
              setPaymentPlanType={setPaymentPlanType}
              setIsCheckOut={setIsCheckOut}
              setModalMessage={setModalMessage}
              setModalHeading={setModalHeading}
            />
            <PricePlan
              type="Gold"
              headingClasses="text-yellow-500"
              sect1="30 days of Unlimited classes at Gold price"
              sect2="8 classes a month after 1st 30 days"
              sect3="Childwatch"
              sect4="Shower access, locker access, and more"
              sect5="Cancel or change plan w/ email or text 48hr notice"
              setShowModal={setShowModal}
              setPaymentPlanType={setPaymentPlanType}
              setIsCheckOut={setIsCheckOut}
              setModalMessage={setModalMessage}
              setModalHeading={setModalHeading}
            />
            <PricePlan
              type="Silver"
              headingClasses="text-slate-500"
              sect1="30 days of Unlimited classes at Gold price"
              sect2="8 classes a month after 1st 30 days"
              sect3="Childwatch"
              sect4="Shower access, locker access, and more"
              sect5="Cancel or change plan w/ email or text 48hr notice"
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
        <div className="w-full h-full flex justify-center items-start mt-32 ">
          <fieldset
            className={css`
              width: 30%;
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
              className="w-2/3 h-2/3 flex flex-col z-50 mb-4"
              method="POST"
            >
              <span className="text-white w-full mb-4">Contact</span>
              <label htmlFor="email_field" className="text-white">
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

              <label htmlFor="message_field" className="text-white">
                Message
              </label>
              <textarea
                id="message_field"
                name="message_field"
                className={`mb-4 rounded p-1 ${css`
                  height: 200px;
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
          </fieldset>
        </div>
      </section>
    </>
  );
}

export default Home;
