import constants from '../utils/constants';
import { send } from '../actions/commonActions';

export const getAll = async () => {
  const requestOptions = {
    method: "GET",
    credentials: "include",
    headers: {
      Accept: "application/json",
    },
  };

  let response = await fetch(constants.server + "/colleges", requestOptions);
  response = await response.json();

  if (response && response.status === 200 && response.data) {
    send({
      list: response.data,
      src: 'colleges',
    });
  } else {
    send([]);
  }
};

export const get = async () => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/colleges`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}

export const getParticipants = async (eventId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/colleges/${eventId}/particpants`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}

export const getTeams = async (eventId) => {
  const requestOptions = {
    method: 'GET',
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/colleges/${eventId}/teams`, requestOptions);
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
    credentials: "include",
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };
  let response = await fetch(`${constants.server}/colleges`, requestOptions);
  let json = await response.json();
  
  return json;
}
