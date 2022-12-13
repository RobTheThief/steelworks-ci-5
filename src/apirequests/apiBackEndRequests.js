import { makeFetchRequest } from "../helpers";

/**
 * Makes a POST request to create a user in the database.
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
    "POST",
    `/api/user/create/`,
    JSON.stringify({
      first_name: firstName,
      last_name: lastName,
      email: email,
      address_line_1: address1,
      address_line_2: address2,
      address_line_3: address3,
      postcode: postCode,
      phone: phone,
    })
  );
};

/**
 * Takes in a string for email and returns the steelworks user object.
 * @param {string} email
 * @returns promise, object
 */
const getSWUser = async (email) => {
  return await makeFetchRequest("GET", `/api/user/get/${email}/`);
};

/**
 * Takes in strings and ints for user details and updates
 * the steelworks user object address,postcode and phone number
 * and returns a status as a string with a promise.
 * @param {int} pk
 * @param {string} user_email
 * @param {string} password,
 * @param {string} address_line_1
 * @param {string} address_line_2
 * @param {string} address_line_3
 * @param {string} postcode
 * @param {int} phone
 * @returns promise, object
 */
const updateUserAddressPhone = async (
  pk,
  user_email,
  password,
  address_line_1,
  address_line_2,
  address_line_3,
  postcode,
  phone
) => {
  return await makeFetchRequest(
    "GET",
    `/api/user/update/${pk}/${user_email}/${password}/${address_line_1}/${address_line_2}/${address_line_3}/${postcode}/${phone}/`
  );
};

/**
 * Gets a list of product/user pairs as objects
 * and returns an array with a promise.
 * @returns promise, array
 */
const getProductUserPairs = async () => {
  return await makeFetchRequest("GET", "/api/product/user-pair/");
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
  subscription_type,
  upgrade,
  userID
) => {
  return await makeFetchRequest(
    "POST",
    `/api/save-stripe-info/${email}/${paymentMethodID}/${subscription_type}/${upgrade}/${userID}/`
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
  class_name,
  details,
  student_id,
  remove_user = "add"
) => {
  return await makeFetchRequest(
    "GET",
    `/api/classes/update/${class_name}/${details}/${student_id}/${remove_user}/`
  );
};

/**
 * Sends a GET request to the backend to get a list of all gym classes
 * and returns a response object.
 * @returns promise, object
 */
const getGymClasses = async () => {
  return await makeFetchRequest("GET", `/api/classes/`);
};

/**
 * Sends a GET request to the backend to get a list of all gym classes
 * that a specific student is in and returns a response object.
 * @returns promise, object
 */
const getUserClasses = async (student_id) => {
  return await makeFetchRequest(
    "GET",
    `/api/classes/user/get-classes/${student_id}/`
  );
};

/**
 * Sends a GET request to the backend to update the class time
 * user pair and returns a response object.
 * @returns promise, object
 */
const classTimeUserPairUpdate = async (
  gym_class_name,
  user_id,
  add_remove = "add",
  time_slot
) => {
  return await makeFetchRequest(
    "GET",
    `api/class-time/user-pair/update/${gym_class_name}/${user_id}/${add_remove}/${time_slot}/`
  );
};

/**
 * Sends a GET request to the backend to get the
 * users class time slots and returns a response object.
 * @returns promise, object
 */
const findUserTimeSlots = async (user_id) => {
  return await makeFetchRequest(
    "GET",
    `api/class-time/user-pair/user-time-slots/${user_id}/`
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
  findUserTimeSlots,
};
