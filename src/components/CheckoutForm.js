import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { saveStripeInfo } from "../apirequests/apiBackEndRequests";

const CheckoutForm = ({ paymentPlanType, userEmail }) => {
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(" ");
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

    await saveStripeInfo(email, paymentMethod.id, paymentPlans[paymentPlanType])
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className=''>
      <div className="form-row">
        <label htmlFor="email">Email Address</label>
        <input
          className=""
          id="email"
          name="name"
          type="email"
          placeholder={userEmail ? userEmail : "example@mail.com"}
          required
          value={email ? email : userEmail}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </div>
      <div className="">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" onChange={handleChange} />
        <div className="" role="alert">
          {error}
        </div>
      </div>
      <button type="submit" className="">
        Submit Payment
      </button>
    </form>
  );
};
export default CheckoutForm;
