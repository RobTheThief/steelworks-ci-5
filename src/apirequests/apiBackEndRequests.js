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

export { createUser };
