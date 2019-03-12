import constants from '../utils/constants';
import { send } from '../actions/commonActions';

export const getAll = async () => {
  const requestOptions = {
    method: "GET",
    headers: {
      Accept: "application/json"
    },
  };

  let response = await fetch(constants.server + "/judges", requestOptions);
  response = await response.json();

  if (response && response.status === 200 && response.data) {
    send(response.data);
  } else {
    send([]);
  }
}

export const get = async () => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  };
  let response = await fetch(`${constants.server}/judges`, requestOptions);
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
  let response = await fetch(`${constants.server}/judges`, requestOptions);
  let json = await response.json();
  if(json.status&&json.status===200) {
    send(json.data);
  } else {
    return null;
  }
}