import { getCookie } from "../helpers";

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
    var formdata = new FormData();
    formdata.append("username", user);
    formdata.append("password", pass);
    formdata.append("password2", pass2);
    formdata.append("email", email);
    formdata.append("first_name", firstName);
    formdata.append("last_name", lastName);

    var requestOptions = {
      credentials: "include",
      method: "POST",
      body: formdata,
    };
    try {
      let response = await fetch(`/register/`, requestOptions);

      let responseJson = await response.json();
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
    var formdata = new FormData();
    formdata.append("username", user);
    formdata.append("password", pass);

    var requestOptions = {
      method: "POST",
      body: formdata,
    };
    try {
      const response = await fetch(`/login/`, requestOptions);

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
 const logout = () => {
    return new Promise(async (resolve) => {
      try {
        var requestOptions = {
          credentials: "include",
          method: "POST",
        };
  
        let response = await fetch(`/logout/`, requestOptions);
  
        resolve(response);
      } catch (error) {
        console.log(error);
        resolve(error);
      }
    });
  };

/**
 * Sends a GET request to the backend to get profile
 * information about the user.
 * @returns object, promise
 */
 const getProfile = () => {
    return new Promise(async (resolve) => {
      try {
        const response = await fetch(`/profile/`, {
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie(),
          },
          credentials: "include",
          method: "GET",
        });
  
        const responseJson = await response.json();
  
        resolve(responseJson);
      } catch (error) {
        console.log(error);
        resolve(error);
      }
    });
  };

export { register, login, getProfile, logout };
