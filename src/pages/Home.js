import React from "react";
import pullups from "../img/pullups1024.jpg";
import PricePlan from "../components/PricePlan";
import { css } from "@emotion/css";
import { Button } from "@mui/material";

function Home(props) {
  const classes = "hidden";
  return (
    <>
      <section className="hero-container" id="hero">
        <div className="mt-16">
          <h2 className="absolute w-full h-full top-0 left-0 text-center m-auto pb-64 lg:text-6xl md:text-4xl sm:text-2xl pt-32 md:pt-64 sm:pt-32 text-blue-500">
            Forge your dream body
            <br /> at <b>Steelworks</b>
          </h2>
        </div>
      </section>
      <section className="m-52 about-section" id="about">
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
      <section id="price-plans" className="price-plan-section">
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
      <section
        id="contact_section"
        className="contact-section"
        aria-labelledby="contact_section_heading"
      >
        <h2 id="contact_section_heading" className="hidden">
          CONTACT
        </h2>
        <div className="w-full h-full flex justify-center items-center">
          <fieldset
            className={css`
              width: 490px;
              height: 310px;
              border-radius: 5px;
              border: #64748b solid 2px;
              background-color: rgba(0, 0, 0, 0.473);
              display: flex;
              justify-content: center;
              align-items: center;
            `}
          >
            <form
              action="https://formspree.io/f/xqkjjegb"
              className=" w-2/3 h-2/3 flex flex-col"
              method="POST"
            >
              <label htmlFor="email_field" className="text-white">
                Email
              </label>
              <input
                id="email_field"
                name="email_field"
                type="email"
                className="w-full mb-4"
                placeholder="example@yourmail.com"
                required
              />

              <label htmlFor="message_field" className="text-white">
                Message
              </label>
              <textarea
                id="message_field"
                name="message_field"
                className="mb-4"
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
