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
      const response = await fetch(`/api/user/${email}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie(),
        },
        redirect: "follow",
      });

      //const responseJson = await response.json();

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
      const response = await fetch(
        `/api/product/user-pair/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(),
          },
          redirect: "follow",
        }
      );

      let jsonResponse = await response.json();

      resolve(jsonResponse);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
};

export { createUser, getSWUser, updateUserAddressPhone, getProductUserPairs };
