import constants from "../utils/constants";
import {toast} from '../actions/toastActions';
import { navigate } from "gatsby";

export const isBrowser = () => typeof window !== "undefined";

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("me")
    ? JSON.parse(window.localStorage.getItem("me"))
    : {};

const setUser = user => {
  isBrowser() && window.localStorage.setItem("me", JSON.stringify(user));
  return user;
};

export const isLoggedIn = () => {
  let user = getUser();
  if (user) return !!user.email;
  return false;
};

const authorize = async ({ email, password }) => {
  console.log(email,password);
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
  console.log('40',response);
  if (response && response.data){
    navigate('/profile');
    return setUser(response.data);
  } 
  else {
    if(response){
      toast(response.message);
    }
    return {};
  }
}

export const logout = callback => {
  setUser({});

  callback();
};
