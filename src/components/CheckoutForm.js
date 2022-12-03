import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { saveStripeInfo } from "../apirequests/apiBackEndRequests";
import SWButton from "./SWButton";

const CheckoutForm = ({ paymentPlanType, userEmail }) => {
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const paymentPlans = {
    Unlimited: "REACT_STRIPE_UNLIMITED_ID",
    Gold: "REACT_STRIPE_GOLD_ID",
    Silver: "REACT_STRIPE_SILVER_ID",
  };

  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });

    await saveStripeInfo(userEmail, paymentMethod.id, paymentPlans[paymentPlanType])
      .then((response) => {
        console.log(response?.data ? response.data : response);
        setError(response?.data ? '' : response?.error);
      })
      .catch((error) => {
        setError(error);
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col">
      <div className="mb-4">
        <label htmlFor="email" className="mr-4">
          Email Address
        </label>
        <input
          className=""
          id="email"
          name="name"
          type="email"
          value={userEmail}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label htmlFor="card-element" className="mr-4 mb-4">
          Credit or debit card
        </label>
        <CardElement id="card-element" onChange={handleChange} />
      </div>
      <div className="flex items-center">
        <SWButton type="submit" width="30%">
          Submit Payment
        </SWButton>
        <div className="h-full w-3/5 ml-4 text-red-500" role="alert">
          {error}
        </div>
      </div>
    </form>
  );
};
export default CheckoutForm;
