const BASE_URL = "http://localhost:8000/";

const getInit = (token) => {
  return {
    headers: {
      "Content-Type": "application/json",
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

const getStates = async (token) => {
  let url = `${BASE_URL}api/states/`;
  return await tryCatchFetch(url, getInit(token));
};

const createState = async (newStateParams, token) => {
  let url = `${BASE_URL}api/states/`;
  let init = getInit(token);
  init["method"] = "POST";
  init["body"] = JSON.stringify(newStateParams);
  return await tryCatchFetch(url, init);
};

const deleteState = async (stateId, token) => {
  let url = `${BASE_URL}api/states/${stateId}/`;
  let init = getInit(token);
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const getStateById = async (stateId, token) => {
  let url = `${BASE_URL}api/states/${stateId}/`;
  return await tryCatchFetch(url, getInit(token));
};

const getCityById = async (cityId, token) => {
  let url = `${BASE_URL}api/cities/`;
  return await tryCatchFetch(url, getInit(token));
};

const addCity = async (newCityParams, token) => {
  let url = `${BASE_URL}api/cities/`;
  let init = getInit(token);
  init["method"] = "POST";
  init["body"] = JSON.stringify(newCityParams);
  return await tryCatchFetch(url, init);
};

const updateCity = async (cityId, updatedCity, token) => {
  let url = `${BASE_URL}api/cities/${cityId}/`;
  let init = getInit(token);
  init["method"] = "PUT";
  init["body"] = JSON.stringify(updatedCity);
  return await tryCatchFetch(url, init);
};

const deleteCity = async (cityId, token) => {
  let url = `${BASE_URL}api/cities/${cityId}/`;
  let init = getInit(token);
  init["method"] = "DELETE";
  return await tryCatchFetch(url, init);
};

const myExports = {
  doLogin,
  signUpUser,
  getStates,
  createState,
  deleteState,
  getStateById,
  getCityById,
  addCity,
  updateCity,
  deleteCity,
};

export default myExports;
