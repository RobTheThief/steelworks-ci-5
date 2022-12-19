import React from 'react';
import { css } from '@emotion/css';
import SWButton from './SWButton';
import { getProfile } from '../apirequests/authRequests';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import DoneAllOutlinedIcon from '@mui/icons-material/DoneAllOutlined';

/**
 * Renders the price plans on the home page and renders copy
 * depending on the type of price plan.
 * @param {object} param0
 * @returns jsx
 */
const PricePlan = ({
  type,
  setShowModal,
  setPaymentPlanType,
  setIsCheckOut,
  setModalMessage,
  setModalHeading
}) => {
  const sectStyle = 'text-white text-center my-4';
  const planPrices = {
    Silver: '€99',
    Gold: '€129',
    Unlimited: '€159'
  };

  /**
   * Handles the click on the sign up button for each price plan.
   * Checks if logged in and shows warning if not. Opens checkout
   * form modal if user is logged in.
   */
  const handleClick = async () => {
    await getProfile().then((res) => {
      if (res.email) {
        setPaymentPlanType(type);
        setShowModal(true);
      } else {
        setShowModal(true);
        setIsCheckOut(false);
        setModalHeading('Please login or register');
        setModalMessage('You must be logged in to sign up for a subscription and to see classes information in your account page.');
      }
    });
  };

  return (
    <>
      <div
        className={`w-1/3 mb-8 border-slate-500 border-2 rounded-lg p-4 flex flex-col items-center ${css`
          min-width: 260px;
          height: 659.3px;
        `}`}
      >
        <div
          className={`relative -top-8 -left-24 ${
            type === 'Silver' ? 'bg-none' : 'bg-black'
          }`}
        >
          {type === 'Unlimited' ? (
            <>
              <svg width={0} height={0}>
                <linearGradient id='linearColors' x1={1} y1={0} x2={1} y2={1}>
                  <stop offset={0} stopColor='#fffd30' />
                  <stop offset={0.8} stopColor='#64748b' />
                  <stop offset={1} stopColor='#64748b' />
                </linearGradient>
              </svg>
              <WorkspacePremiumOutlinedIcon
                color='primary'
                fontSize='large'
                className={` ${css`
                  transform: scale(2);
                `}`}
                sx={{ fill: 'url(#linearColors)' }}
              />
            </>
          ) : type === 'Gold' ? (
            <MilitaryTechIcon
              color='secondary'
              fontSize='large'
              className={` ${css`
                transform: scale(1.5);
                color: yellow !important;
              `}`}
            />
          ) : (
            <MilitaryTechIcon
              fontSize='large'
              className={` ${css`
                visibility: hidden;
              `}`}
            />
          )}
        </div>
        <h3 className='text-blue-500 text-center text-3xl'>
          <b>{type}</b>
        </h3>
        <p className={`text-2xl font-extrabold ${sectStyle}`}>
          {planPrices[type]}
        </p>
        <p className={sectStyle}>
          {type !== 'Unlimited' ? (
            <span>
              <b>30 days of Unlimited</b> classes at <b>{type}</b> price
            </span>
          ) : (
            <span>
              <b>Unlimited access</b> to classes for a full year
            </span>
          )}
        </p>
        <p className={sectStyle}>
          {type === 'Silver' ? 1 : type === 'Gold' ? 2 : 4} classes a month
          after 1st 30 days
          <span className='ml-2'>
            <DoneAllOutlinedIcon className='text-yellow-200' />
          </span>
        </p>
        <p className={sectStyle}>
          Shower access, locker access, and more
          <span className='ml-2'>
            <DoneAllOutlinedIcon className='text-yellow-200' />
          </span>
        </p>
        <p className={sectStyle}>
          Cancel or change plan w/ email or text 48hr notice
          <span className='ml-2'>
            <DoneAllOutlinedIcon className='text-yellow-200' />
          </span>
        </p>
        <p className={`${type === 'Silver' && 'text-slate-400'} ${sectStyle}`}>
          Access to swimming pool
          {type !== 'Silver' ? (
            <span className='ml-2'>
              <DoneAllOutlinedIcon className='text-yellow-200' />
            </span>
          ) : null}
        </p>
        <p className={`${type === 'Silver' && 'text-slate-400'} ${sectStyle}`}>
          Childwatch
          {type !== 'Silver' ? (
            <span className='ml-2'>
              <DoneAllOutlinedIcon className='text-yellow-200' />
            </span>
          ) : null}
        </p>
        <SWButton handleOnClick={handleClick}>Sign up</SWButton>
      </div>
    </>
  );
};

export default PricePlan;
