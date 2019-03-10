import constants from '../utils/constants';
import { send } from '../actions/commonActions';

const login = (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  };

  let response = await fetch(`${constants.server}/users/login`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    localStorage.setItem('user', JSON.stringify(json.data));
    navigate("/events");
    return json.data;
  }
  else{
    return null;
  }
}

export const get = async (id) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/user/${id}`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
 } 

export const create = async (payload) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/user`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}

export const update = async (payload) => {
  const requestOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/user`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}

export const logout = () => {
  // remove user from local storage to log user out
  localStorage.removeItem('user');
}
