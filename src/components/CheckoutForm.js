import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import { saveStripeInfo } from '../apirequests/apiBackEndRequests';
import LoadingButton from '@mui/lab/LoadingButton';
import Modal from './Modal';

/**
 * Renders checkout form for stripe payment and makes a request
 * to make a payment.
 * @param {object} param0
 * @returns jsx
 */
const CheckoutForm = ({ paymentPlanType, userEmail, userID }) => {
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalHeading, setModalHeading] = useState('');
  const [responseMessage, setResponseMessage] = useState();
  const [loading, setLoading] = useState(false);
  const [passFunc, setPassFunc] = useState(true);
  const [disableSubmit, setDisableSubmit] = useState(true);

  const stripe = useStripe();
  const elements = useElements();
  const paymentPlans = {
    Unlimited: 'REACT_STRIPE_UNLIMITED_ID',
    Gold: 'REACT_STRIPE_GOLD_ID',
    Silver: 'REACT_STRIPE_SILVER_ID'
  };

  /**
   * Submits a payment with the option set to upgrade.
   */
  const setUpgradeState = () => {
    handleSubmit('upgrade')();
  };

  /**
   * Takes in the event object and handles change of the payment form.
   * Displays an error if incorrect input or enables submit button if
   * ok and complete.
   * @param {object} event
   */
  const handleChange = (event) => {
    setDisableSubmit(!event.complete);
    if (event.error) {
      setError(event.error.message.toString());
    } else {
      setError(null);
    }
  };

  /**
   * Accepts a string as upgrade option. Sets loading true and
   * creates a payment method object and attempts a stripe payment.
   * @param {string} upgrade
   */
  const handleSubmit = (upgrade) => async (event) => {
    event && event.preventDefault();
    setLoading(true);
    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: 'card',
      card: card
    });

    if (error) setError(error.toString());

    await saveStripeInfo(
      userEmail,
      paymentMethod.id,
      paymentPlans[paymentPlanType],
      upgrade,
      parseInt(userID)
    )
      .then((response) => {
        setError(response?.data ? '' : response?.error.toString());
        setResponseMessage(response.data?.message);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.toString());
        console.log(error);
        setLoading(false);
      });
  };

  /**
   * Opens a modal based on the responseMessage from the stripe payment.
   */
  useEffect(() => {
    setModalHeading('Subscription information');
    setShowModal(true);
    switch (responseMessage) {
      case 'Subscription already active for same product':
        setModalMessage(responseMessage);
        setPassFunc(false);
        break;
      case 'Are you sure you want to upgrade your subscription?':
        setModalMessage(
          `${responseMessage} You will need to contact support to cancel your current subscription.`
        );
        setPassFunc(true);
        break;
      case 'You cannot downgrade your subscription':
        setModalMessage(responseMessage);
        setPassFunc(false);
        break;
      case 'Success':
        setModalMessage(
          `${responseMessage}! you have subscribed for ${paymentPlanType} membership.`
        );
        setPassFunc(false);
        break;
      default:
        setShowModal(false);
        break;
    }
  }, [responseMessage]);

  return (
    <>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        message={modalMessage}
        heading={modalHeading}
        isInput
        func={passFunc && setUpgradeState}
        setResponseMessage={setResponseMessage}
      />
      <h2 className='mb-4 -mt-4 text-2xl'>
        Sign up for 1 year <b className='text-blue-500'>{paymentPlanType}</b>{' '}
        Subscription
      </h2>
      <form onSubmit={handleSubmit('no-upgrade')} className='flex flex-col'>
        <div className='mb-4'>
          <label htmlFor='email' className='mr-4'>
            Email Address
          </label>
          <input
            className=''
            id='email'
            name='name'
            type='email'
            value={userEmail ? userEmail : 'invalid@nomail.com'}
            readOnly
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='card-element' className='mr-4 mb-4'>
            Credit or debit card
          </label>
          <CardElement id='card-element' onChange={handleChange} />
        </div>
        <div className='flex items-center'>
          <LoadingButton
            disabled={disableSubmit}
            loading={loading}
            type='submit'
            variant='outlined'
          >
            Submit Payment
          </LoadingButton>
          <div className='h-full w-3/5 ml-4 text-red-500' role='alert'>
            {error}
          </div>
        </div>
      </form>
    </>
  );
};
export default CheckoutForm;
