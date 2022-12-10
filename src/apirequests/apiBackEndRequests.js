import { getCookie } from "../helpers";

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
function createUser(
  email,
  firstName,
  lastName,
  address1,
  address2,
  address3,
  postCode,
  phone
) {
  return new Promise(async (resolve) => {
    try {
      let response = fetch(`/api/user/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie(),
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          address_line_1: address1,
          address_line_2: address2,
          address_line_3: address3,
          postcode: postCode,
          phone: phone,
        }),
      }).then((res) => {
        if (res.ok) return res.json();
      });
      resolve(response);
    } catch (error) {
      resolve();
      console.log(error);
    }
  });
}

/**
 * Takes in a string for email and returns the steelworks user object.
 * @param {string} email
 * @returns promise, object
 */
const getSWUser = (email) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(`/api/user/get/${email}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie(),
        },
        redirect: "follow",
      });

      resolve(response);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
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
const updateUserAddressPhone = (
  pk,
  user_email,
  password,
  address_line_1,
  address_line_2,
  address_line_3,
  postcode,
  phone
) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `/api/user/update/${pk}/${user_email}/${password}/${address_line_1}/${address_line_2}/${address_line_3}/${postcode}/${phone}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(),
          },
          redirect: "follow",
        }
      );

      resolve(response);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
};

/**
 * Gets a list of product/user pairs as objects
 * and returns an array with a promise.
 * @returns promise, array
 */
const getProductUserPairs = () => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(`/api/product/user-pair/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie(),
        },
        redirect: "follow",
      });

      let jsonResponse = await response.json();

      resolve(jsonResponse);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
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
const saveStripeInfo = (
  email,
  paymentMethodID,
  subscription_type,
  upgrade,
  userID
) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `/api/save-stripe-info/${email}/${paymentMethodID}/${subscription_type}/${upgrade}/${userID}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(),
          },
          redirect: "follow",
        }
      );

      const jsonResponse = await response.json();

      resolve(jsonResponse);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
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
const updateGymClass = (
  class_name,
  details,
  instr_email,
  student_id,
  remove_user = "add"
) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `/api/classes/update/${class_name}/${details}/${instr_email}/${student_id}/${remove_user}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(),
          },
          redirect: "follow",
        }
      );

      const jsonResponse = await response.json();

      resolve(jsonResponse);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
};

/**
 * Sends a GET request to the backend to get a list of all gym classes
 * and returns a response object.
 * @returns promise, object
 */
const getGymClasses = () => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(`/api/classes/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie(),
        },
        redirect: "follow",
      });

      const jsonResponse = await response.json();

      resolve(jsonResponse);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
};

/**
 * Sends a GET request to the backend to get a list of all gym classes
 * that a specific student is in and returns a response object.
 * @returns promise, object
 */
const getUserClasses = (student_id) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(
        `/api/classes/user/get-classes/${student_id}/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(),
          },
          redirect: "follow",
        }
      );

      const jsonResponse = await response.json();

      resolve(jsonResponse);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
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
};
