/* eslint-disable no-async-promise-executor */
/* eslint-disable semi */
import { makeFetchRequest } from '../helpers';

/**
 * Sends a POST request to the backend to registers a new user.
 * @param {String} user
 * @param {String} pass
 * @param {String} pass2
 * @param {String} email
 * @param {String} firstName
 * @param {String} lastName
 * @returns object, promise
 */
const register = (user, pass, pass2, email, firstName, lastName) => {
  return new Promise(async (resolve) => {
    const formdata = new FormData();
    formdata.append('username', user);
    formdata.append('password', pass);
    formdata.append('password2', pass2);
    formdata.append('email', email);
    formdata.append('first_name', firstName);
    formdata.append('last_name', lastName);

    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      body: formdata
    };
    try {
      const response = await fetch('/register/', requestOptions);

      const responseJson = await response.json();
      resolve(responseJson);
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

/**
 * Sends a post request to the backend to log in user.
 * @param {string} user
 * @param {string} pass
 * @returns object, promise
 */
const login = (user, pass) => {
  return new Promise(async (resolve) => {
    const formdata = new FormData();
    formdata.append('username', user);
    formdata.append('password', pass);

    const requestOptions = {
      method: 'POST',
      body: formdata
    };
    try {
      const response = await fetch('/login/', requestOptions);

      resolve(response);
    } catch (error) {
      console.log(error);
      resolve(error);
    }
  });
};

/**
 * Sends a POST request to the backend to logout user
 * @returns promise
 */
const logout = async () => {
  return await makeFetchRequest('POST', '/logout/', null, true);
};

/**
 * Sends a GET request to the backend to get profile
 * information about the user.
 * @returns object, promise
 */
const getProfile = async () => {
  return await makeFetchRequest('GET', '/profile/');
};

export { register, login, getProfile, logout };
