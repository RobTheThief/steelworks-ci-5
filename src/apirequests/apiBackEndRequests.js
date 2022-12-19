/* eslint-disable object-shorthand */
/* eslint-disable semi */
import { makeFetchRequest } from '../helpers';

/**
 * Makes a POST request to create a user in the database
 * and returns a promise.
 * @param {string} email
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} address1
 * @param {string} address2
 * @param {string} address3
 * @param {string} postCode
 * @param {string} phone
 * @returns promise
 */
const createUser = async (
  email,
  firstName,
  lastName,
  address1,
  address2,
  address3,
  postCode,
  phone
) => {
  return await makeFetchRequest(
    'POST',
    '/api/user/create/',
    JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      address_line_1: address1,
      address_line_2: address2,
      address_line_3: address3,
      postcode: postCode,
      phone: phone
    })
  );
};

/**
 * Takes in a string for email and returns the steelworks user object.
 * @param {string} email
 * @returns promise, object
 */
const getSWUser = async (email) => {
  return await makeFetchRequest('GET', `/api/user/get/${email}/`);
};

/**
 * Takes in strings and ints for user details and updates
 * the steelworks user object address,postcode and phone number
 * and returns a status as a string with a promise.
 * @param {int} pk
 * @param {string} userEmail
 * @param {string} password,
 * @param {string} addressLine1
 * @param {string} addressLine2
 * @param {string} addressLine3
 * @param {string} postcode
 * @param {int} phone
 * @returns promise, object
 */
const updateUserAddressPhone = async (
  pk,
  userEmail,
  password,
  addressLine1,
  addressLine2,
  addressLine3,
  postcode,
  phone
) => {
  return await makeFetchRequest(
    'GET',
    `/api/user/update/${pk}/${userEmail}/${password}/${addressLine1}/${addressLine2}/${addressLine3}/${postcode}/${phone}/`
  );
};

/**
 * Gets a list of product/user pairs as objects
 * and returns an array with a promise.
 * @returns promise, array
 */
const getProductUserPairs = async () => {
  return await makeFetchRequest('GET', '/api/product/user-pair/');
};

/**
 *Sends a POST request to the backend to make a stripe payment. Takes the user
 * email, paymentMenthodID and subscription type as parameters and returns
 * a response object.
 * @param {string} email
 * @param {string} paymentMethodID
 * @param {string} subscription_type
 * @returns promise, object
 */
const saveStripeInfo = async (
  email,
  paymentMethodID,
  subscriptionType,
  upgrade,
  userID
) => {
  return await makeFetchRequest(
    'POST',
    `/api/save-stripe-info/${email}/${paymentMethodID}/${subscriptionType}/${upgrade}/${userID}/`
  );
};

/**
 * Sends a GET request to the backend to update a gym class. Takes the
 * class name, details, instructor email and student id as parameters
 * and returns a response object.
 * @param {string} class_name
 * @param {string} details
 * @param {string} instr_email
 * @param {int} student_id
 * @returns promise, object
 */
const updateGymClass = async (
  className,
  details,
  studentID,
  removeUser = 'add'
) => {
  return await makeFetchRequest(
    'GET',
    `/api/classes/update/${className}/${details}/${studentID}/${removeUser}/`
  );
};

/**
 * Sends a GET request to the backend to get a list of all gym classes
 * and returns a response object.
 * @returns promise, object
 */
const getGymClasses = async () => {
  return await makeFetchRequest('GET', '/api/classes/');
};

/**
 * Sends a GET request to the backend to get a list of all gym classes
 * that a specific student is in and returns a response object.
 * @returns promise, object
 */
const getUserClasses = async (studentID) => {
  return await makeFetchRequest(
    'GET',
    `/api/classes/user/get-classes/${studentID}/`
  );
};

/**
 * Sends a GET request to the backend to update the class time
 * user pair and returns a response object.
 * @returns promise, object
 */
const classTimeUserPairUpdate = async (
  gymClassName,
  userID,
  addRemove = 'add',
  timeSlot
) => {
  return await makeFetchRequest(
    'GET',
    `api/class-time/user-pair/update/${gymClassName}/${userID}/${addRemove}/${timeSlot}/`
  );
};

/**
 * Sends a GET request to the backend to get the
 * users class time slots and returns a response object.
 * @returns promise, object
 */
const findUserTimeSlots = async (userID) => {
  return await makeFetchRequest(
    'GET',
    `api/class-time/user-pair/user-time-slots/${userID}/`
  );
};

export {
  createUser,
  getSWUser,
  updateUserAddressPhone,
  getProductUserPairs,
  saveStripeInfo,
  updateGymClass,
  getGymClasses,
  getUserClasses,
  classTimeUserPairUpdate,
  findUserTimeSlots
};
