/**
 * Finds csrf token and returns as string in format csrftoken=TOKEN
 * to be used in header of fetch requests.
 * @returns string
 */
const getCookie = () => {
  if (!document.cookie) {
    return null;
  }

  const xsrfCookies = document.cookie
    .split(";")
    .map((c) => c.trim())
    .filter((c) => c.startsWith("csrftoken="));

  if (xsrfCookies.length === 0) {
    return null;
  }
  return decodeURIComponent(xsrfCookies[0].split("=")[1]);
};

/**
 * Takes in a method and a url as strings, and a body
 * if applicable, makes a fetch request, converts
 * response to json and returns a promise object.
 * @param {string} method
 * @param {string} url
 * @param {object} body
 * @returns promise, array
 */
const makeFetchRequest = (method, url, body, isJson) => {
  return new Promise(async (resolve) => {
    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": getCookie(),
        },
        redirect: "follow",
        body: body && body,
      });

      const jsonResponse = !isJson ? await response.json() : null;

      resolve(!isJson ? jsonResponse : response);
    } catch (error) {
      console.log(error);
      resolve();
    }
  });
};

export { makeFetchRequest };
