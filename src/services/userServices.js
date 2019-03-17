import request from "../utils/request";
import constants from "../utils/constants";
import { send } from "../actions/commonActions";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.sessionStorage.getItem("me")
    ? JSON.parse(window.sessionStorage.getItem("me"))
    : {};

export const setUser = user => {
  isBrowser() && window.sessionStorage.setItem("me", JSON.stringify(user));
  return user;
};

export const isLoggedIn = () => {
  let user = getUser();
  if (user) return !!user.email;
  return false;
};

const authorize = async (partialUser) => {
  let response = await request(constants.server + "/users/login", "POST", partialUser);

  return response;
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
  let response = await request(constants.server + "/users");

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
  let response = await request(`${constants.server}/users/${id}`);

  if(response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'users',
    });
  } else {
    return null;
  }
 }

export const create = async (payload) => {
  let response = await request(`${constants.server}/users`, "POST", payload);
  return response;
}

export const updateUser = async (user,payload) => {
  let response = await request(`${constants.server}/users/${user}`, "POST", payload);
  return response;
}

export const update = async (payload) => {
  let response = await request(`${constants.server}/users/`, "PATCH", payload);

  if (response.status && response.status === 200) {
    send({
      list: response.data,
      src: 'users',
    });
  } else {
    return null;
  }
}
