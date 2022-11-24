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

export { register };
