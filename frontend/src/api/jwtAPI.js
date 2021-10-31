const BASE_URL = "http://localhost:8000/";

const getInit = (token) => {
  return {
    headers: {
      "Content-Type": "applicaton/json",
      Authorization: `JWT ${token}`,
    },
  };
};

const tryCatchFetch = async (url, init) => {
  try {
    let response = await fetch(url, init);
    if (response.ok) {
      if (response.status !== 204) {
        let data = await response.json();
        return data;
      } else {
        return { success: true };
      }
    }
  } catch (error) {
    console.error(":ERR:", error);
    return null;
  }
};

const doLogin = async (credentials) => {
  let url = `${BASE_URL}token-auth/`;
  let init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  };
  return await tryCatchFetch(url, init);
};

const signUpUser = async (userObject) => {
  let url = `${BASE_URL}login/users/`;
  let init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userObject),
  };
  return await tryCatchFetch(url, init);
};

const displayHomePage = async (token) => {
  let url = "http://localhost:3000/";
  return await tryCatchFetch(url, getInit(token));
};

const myExports = {
  doLogin,
  signUpUser,
  displayHomePage,
};

export default myExports;
