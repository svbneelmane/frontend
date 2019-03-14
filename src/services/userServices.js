import constants from "../utils/constants";
import { send } from "../actions/commonActions";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("me")
    ? JSON.parse(window.localStorage.getItem("me"))
    : {};

export const setUser = user => {
  isBrowser() && window.localStorage.setItem("me", JSON.stringify(user));
  return user;
};

export const isLoggedIn = () => {
  let user = getUser();
  if (user) return !!user.email;
  return false;
};

const authorize = async ({ email, password }) => {
  let response = await fetch(constants.server + "/users/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type":"application/json",
      "Accept":"application/json"
    },
    body: JSON.stringify({ email, password }),
   });

   return await response.json();
};

export const login = async (partialUser) => {
  // TODO: Add some sanity checks
  let response = await authorize(partialUser);
  return response;
}

export const logout = callback => {
  setUser({});

  callback();
};

export const getAll = async () => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  };

  let response = await fetch(constants.server + "/users", requestOptions);
  response = await response.json();

  if (response && response.status === 200 && response.data) {
    send({
      list: response.data,
      src: 'users',
    });
  } else {
    send([]);
  }
};

export const get = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: "include",
  };
  let response = await fetch(`${constants.server}/users/${id}`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
 }

export const create = async (payload) => {
  console.log('PAYLOAD',payload)
  const requestOptions = {
    method: 'POST',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/users`, requestOptions);
  let json = await response.json();
  return json;
}

export const update = async (payload) => {
  const requestOptions = {
    method: 'PATCH',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/users`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}
